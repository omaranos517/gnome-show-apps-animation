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
   1. Clone or download this repository.
   2. Copy the folder to:
      `~/.local/share/gnome-shell/extensions/scale-down-animation@omaranos.gmail.com/`
   3. Restart GNOME Shell:
      - **Xorg**: `Alt + F2`, type `r`, press Enter
      - **Wayland**: log out and log in again
   4. Enable the extension using the GNOME Extensions app, or run:
      `gnome-extensions enable scale-down-animation@omaranos.gmail.com`

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
