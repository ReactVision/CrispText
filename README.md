# CrispText

Sharp, non-pixelated text for [ViroReact](https://github.com/ReactVision/viro) apps — a drop-in replacement for `ViroText`.

## Why

`ViroText` draws glyphs into a texture only `fontSize` pixels high, then stretches it over the text box in world space. On large panels or in a headset that texture gets magnified and the text looks pixelated.

`CrispText` renders the text at a multiple of its size (font size and box ×4 by default) and scales the node back down by the same amount. The text occupies exactly the same space in your scene, but the glyphs are 4× sharper.

## Install

Requires `@reactvision/react-viro`. Copy `CrispText.tsx` into your project, e.g. `src/components/CrispText.tsx`.

## Usage

```tsx
import { CrispText } from "./components/CrispText";

<CrispText
  text="Place the cones along the line"
  position={[0, 1.4, -1.5]}
  width={1.2}
  height={0.3}
  style={{ fontSize: 12, color: "#FFFFFF", textAlign: "center" }}
  textClipMode="None"
/>
```

Use it anywhere you would use `ViroText`; `width`, `height` and `fontSize` mean the same thing.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | Required. |
| `width` | `number` | — | Required. Text box width in metres. |
| `height` | `number` | — | Required. Text box height in metres. |
| `position` | `[x, y, z]` | `[0, 0, 0]` | Metres. |
| `style` | ViroText style | `fontSize: 18` | `fontSize` is supersampled internally. |
| `supersample` | `number` | `4` | Raise to 6+ for text read up close (HUDs). |
| `textClipMode` | ViroText prop | `"ClipToBounds"` | Use `"None"` so long labels never lose words. |
| `maxLines` | ViroText prop | — | Passed through. |
| `textLineBreakMode` | ViroText prop | — | Passed through. |

## Tips

- **Put text on opaque panels.** A translucent panel behind text can make letters shimmer or punch holes in the panel. Sit the text a few millimetres (≈8 mm) in front of it.
- **Don't overdo `supersample`.** Each step makes a bigger glyph texture; 4–6 is plenty for most cases.
