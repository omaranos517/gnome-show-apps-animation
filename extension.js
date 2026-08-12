import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as AppDisplay from 'resource:///org/gnome/shell/ui/appDisplay.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const PRESS_SCALE = 0.78;
const PRESS_ANIMATION_MS = 80;
const RELEASE_ANIMATION_MS = 120;
const RESET_DELAY_MS = PRESS_ANIMATION_MS + RELEASE_ANIMATION_MS + 10;

export default class ShowAppsScaleDownAnimationExtension extends Extension {
    enable() {
        if (this._originalActivate)
            return;

        const extension = this;
        this._timeoutId = [];
        this._originalActivate = AppDisplay.AppIcon.prototype.activate;

        AppDisplay.AppIcon.prototype.activate = function (...args) {
            const appIcon = this;
            const iconActor = extension._getAnimatableActor(appIcon);

            // Guard against double-clicks
            if (appIcon._scaleDownAnimationInFlight)
                return;

            let originalHide = Main.overview.hide;
            Main.overview.hide = () => {}; 

            try {
                extension._originalActivate.call(appIcon, ...args);
            } finally {}

            appIcon._scaleDownAnimationInFlight = true;

            if (iconActor) {
                extension._playScaleDownAnimation(iconActor, () => {
                    Main.overview.hide = originalHide;
                    Main.overview.hide();
                    
                    let timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, RESET_DELAY_MS, () => {
                        appIcon._scaleDownAnimationInFlight = false;
                        extension._timeoutId = extension._timeoutId.filter(id => id !== timeoutId);
                        return GLib.SOURCE_REMOVE;
                    });
                    extension._timeoutId.push(timeoutId);
                });
            } else {
                Main.overview.hide = originalHide;
                Main.overview.hide();
            }
        };
    }

    disable() {
        if (!this._originalActivate)
            return;

        if (this._timeoutId) {
            this._timeoutId.forEach(id => GLib.Source.remove(id));
            this._timeoutId = [];
        }

        AppDisplay.AppIcon.prototype.activate = this._originalActivate;
        this._originalActivate = null;
    }

    _getAnimatableActor(appIcon) {
        return appIcon.icon ?? appIcon._iconBin ?? appIcon.child ?? null;
    }

    _playScaleDownAnimation(actor, onAnimationComplete) {

        actor.remove_all_transitions();

        actor.set_pivot_point(0.5, 0.5);

        actor.ease({
            scale_x: PRESS_SCALE,
            scale_y: PRESS_SCALE,
            duration: PRESS_ANIMATION_MS,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
            onComplete: () => {
                onAnimationComplete();

                actor.ease({
                    scale_x: 1,
                    scale_y: 1,
                    duration: RELEASE_ANIMATION_MS,
                    mode: Clutter.AnimationMode.EASE_OUT_BACK,
                });
            },
        });
    }
}
