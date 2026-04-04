# GNOME Show Apps Scale Animation

Adds a smooth scale-down click animation to app icons launched from the GNOME Show Apps grid.

## Features
- Smooth scale-down animation on icon click
- Bounce effect when returning to normal size
- Lightweight and fast
- Works on GNOME 46 (adjustable for other versions)

## Installation
1. Install from the GNOME Extensions website:

[<img src="https://raw.githubusercontent.com/andyholmes/gnome-shell-extensions-badge/master/get-it-on-ego.svg?sanitize=true" height="100">](https://extensions.gnome.org/extension/9583/show-apps-animation/)


2. Or install it manually:
   1. Download the [latest release](https://github.com/omaranos517/gnome-show-apps-animation/releases/latest) (for example **Source code (zip)**), then extract the archive and open the extracted folder in a terminal.
   2. Either run **`./install.sh`** from that folder (it copies files, tries to enable the extension, and explains how to reload GNOME Shell), **or** copy the extension files into:
      `~/.local/share/gnome-shell/extensions/show-apps-animation@omaranos.gmail.com/`
   3. Restart GNOME Shell:
      - **Xorg**: `Alt + F2`, type `r`, press Enter
      - **Wayland**: log out and log in again
   4. If it is not enabled yet, use the GNOME Extensions app or run:
      `gnome-extensions enable show-apps-animation@omaranos.gmail.com`

## Usage
- Click any app icon in the Show Apps grid
- Watch the smooth scale-down animation with bounce effect

## Future Plans
- Add settings to customize:
  - Animation speed
  - Scale factor
  - Animation type (bounce, zoom, etc.)
- Support more GNOME versions
- Optionally integrate with other GNOME UI enhancements


## License
This project is licensed under the [GNU GPL v2 License](LICENSE) – free to use, modify, and redistribute under the same license.
