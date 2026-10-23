# Survivor Odyssey Pilipinas — Island Search

A standalone, host-operated 6×5 search board. Clicking a square overlays a freshly dug pit and marks it searched. No item identities are shown or stored in the player-facing application.

## Publish to GitHub Pages
1. Create a new public GitHub repository, e.g. `odyssey-island-search`.
2. Upload `index.html`, `styles.css`, `script.js`, and the entire `assets` directory, preserving paths.
3. Open repository **Settings → Pages** and deploy from the `main` branch, root folder.
4. Open the GitHub Pages URL after deployment.

## Controls
- Click any unsearched coordinate to add a dug-up earth marker.
- Click a searched coordinate again to remove its marker if selected by mistake.
- Every change is saved immediately; marked squares remain marked after refreshing or reopening the page in the same browser.
- Undo last search removes the latest marker.
- Reset board asks for confirmation before clearing all markers.
- Progress saves automatically in browser localStorage on the current browser/device. It is not synchronized between devices.

## Artwork and alignment
The board image is 1536×1024. Click targets use image-relative percentage coordinates calibrated in `script.js` (`bounds`). If the artwork is replaced, recalibrate `bounds`.

No dependencies or build step are required.
