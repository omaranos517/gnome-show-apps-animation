#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

INSTALL_DIR="${HOME}/.local/share/gnome-shell/extensions/show-apps-animation@omaranos.gmail.com"

echo "Installing Show Apps Animation..."

if [[ -d "$INSTALL_DIR" ]]; then
    rm -rf "$INSTALL_DIR"
fi

mkdir -p "$INSTALL_DIR"

# * does not match dotfiles, so e.g. .git is not copied.
cp -a ./* "$INSTALL_DIR/"

echo "Enabling extension..."
if gnome-extensions enable show-apps-animation@omaranos.gmail.com 2>/dev/null; then
    echo "Extension enabled."
else
    echo "Could not enable yet — after you reload GNOME Shell, run:"
    echo "  gnome-extensions enable show-apps-animation@omaranos.gmail.com"
fi

echo
echo "Installed to: $INSTALL_DIR"
echo "Reload GNOME Shell for changes to apply:"
echo "  • X11: Alt+F2, type r, Enter"
echo "  • Wayland: log out and log back in"
echo
read -r -p "Restart GDM now? (logs out ALL users on this machine) [y/N] " REPLY
if [[ "${REPLY:-}" =~ ^[Yy]$ ]]; then
    sudo systemctl restart gdm
    echo "GDM restarted."
else
    echo "Skipped GDM restart."
fi

echo "Done."
