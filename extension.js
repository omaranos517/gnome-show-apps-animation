import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as AppDisplay from 'resource:///org/gnome/shell/ui/appDisplay.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const ANIMATION_DURATION_MS = 140;
const RESET_DELAY_MS = 80;

export default class ShowAppsScaleDownAnimationExtension extends Extension {
    enable() {
        if (this._originalActivate)
            return;

        const extension = this;
        this._originalActivate = AppDisplay.AppIcon.prototype.activate;

        AppDisplay.AppIcon.prototype.activate = function (...args) {
            const appIcon = this;
            const iconActor = extension._getAnimatableActor(appIcon);

            let originalHide = Main.overview.hide;
            Main.overview.hide = () => {}; 

            if (appIcon._scaleDownAnimationInFlight)
                return;

            appIcon._scaleDownAnimationInFlight = true;

            if (iconActor) {
                extension._playScaleDownAnimation(iconActor, () => {
                    try {
                        extension._originalActivate.call(appIcon, ...args);
                    } finally {
                        Main.overview.hide = originalHide;
                        Main.overview.hide();
                        
                        GLib.timeout_add(GLib.PRIORITY_DEFAULT, RESET_DELAY_MS, () => {
                            appIcon._scaleDownAnimationInFlight = false;
                            return GLib.SOURCE_REMOVE;
                        });
                    }
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

        AppDisplay.AppIcon.prototype.activate = this._originalActivate;
        this._originalActivate = null;
    }

    _getAnimatableActor(appIcon) {
        return appIcon.icon ?? appIcon._iconBin ?? appIcon.child ?? null;
    }

    _playScaleDownAnimation(actor, onMidpoint) {
        actor.remove_all_transitions();

        actor.set_pivot_point(0.5, 0.5);

        actor.ease({
            scale_x: 0.78,
            scale_y: 0.78,
            duration: ANIMATION_DURATION_MS,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
            onComplete: () => {
                onMidpoint();

                actor.ease({
                    scale_x: 1,
                    scale_y: 1,
                    duration: ANIMATION_DURATION_MS,
                    mode: Clutter.AnimationMode.EASE_OUT_BACK,
                });
            },
        });
    }
}
