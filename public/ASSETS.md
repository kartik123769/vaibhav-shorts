# /public — Asset Manifest

Drop all media files here before rendering.
All assets are referenced via `staticFile('images/...')` in code.

## /public/images/
| File                        | Scene | Priority    | Usage                          |
|-----------------------------|-------|-------------|-------------------------------|
| vaibhav_boundary_clip.mp4   | 1     | 🔴 Critical | VideoBackground Scene 1       |
| vaibhav_dejected.jpg        | 2     | 🔴 Critical | ImageBackground Scene 2       |
| vaibhav_portrait.jpg        | 7     | 🔴 Critical | SplitScreen right panel       |
| vaibhav_cutout.png          | 4     | 🔴 Critical | PlayerCarousel panel 3        |
| virat_young.jpg             | 7     | 🔴 Critical | SplitScreen left panel        |
| virat_rcb_dejected.jpg      | 7     | 🟡 High     | Overlay reference             |
| virat_cutout.png            | 6     | 🟡 High     | Dream graphic scene 6         |
| buttler_cutout.png          | 4     | 🟡 High     | PlayerCarousel panel 1        |
| jaiswal_cutout.png          | 4     | 🟡 High     | PlayerCarousel panel 2        |
| antilia_img.jpg             | 6     | 🟢 Medium   | Escape plan visual            |
| rr_logo.png                 | 1,4,5 | 🔴 Critical | Logo overlays                 |
| rcb_logo.png                | 6,7   | 🟡 High     | Team logos scene 6            |
| mi_logo.png                 | 6     | 🟡 High     | Team logos scene 6            |
| csk_logo.png                | 6     | 🟡 High     | Team logos scene 6            |
| ipl_trophy.png              | 5     | 🟡 High     | Trophy shatter scene 5        |

## /public/particles/
| File                  | Scene | Usage                    |
|-----------------------|-------|--------------------------|
| fire_particle.webm    | 3     | Stat card overlay        |
| shatter_particle.webm | 5     | Trophy shatter overlay   |
| confetti.webm         | 6     | Confetti burst (fallback)|

## Integration
To wire assets, replace `undefined` src props with `staticFile('images/filename.ext')`.
Example in Scene1Hook.tsx:
```tsx
<VideoBackground src={staticFile('videos/vaibhav_boundary_clip.mp4')} />
```
