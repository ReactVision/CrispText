/**
 * CrispText — supersampled ViroText for sharp text in AR/VR.
 *
 * ViroText rasterizes glyphs at `fontSize` px and maps them onto a world-unit
 * layout box, so body-copy sizes stretched across a large panel are magnified
 * far past their texture resolution — visibly pixelated, especially on a
 * headset. CrispText renders at `supersample`× the font size and layout box,
 * then scales the node back down by the same factor: identical world-space
 * layout, sharper glyph texture.
 */
import React from "react";
import { ViroNode, ViroText } from "@reactvision/react-viro";

/** Default glyph supersample. Text read up close (e.g. a head-locked HUD)
 * may need more — 6× is a good starting point there. */
export const DEFAULT_SUPERSAMPLE = 4;

type ViroTextProps = React.ComponentProps<typeof ViroText>;

export type CrispTextProps = {
  text: string;
  /** Position in metres, [x, y, z]. */
  position?: [number, number, number];
  /** Layout box width in metres (same meaning as ViroText `width`). */
  width: number;
  /** Layout box height in metres (same meaning as ViroText `height`). */
  height: number;
  /** ViroText style. `fontSize` is multiplied by `supersample` internally. */
  style?: ViroTextProps["style"];
  /** ViroText defaults to "ClipToBounds", which silently cuts overflowing
   * words. Pass "None" on labels that must never lose text. */
  textClipMode?: ViroTextProps["textClipMode"];
  maxLines?: ViroTextProps["maxLines"];
  textLineBreakMode?: ViroTextProps["textLineBreakMode"];
  /** Glyph raster multiplier (layout in world units is unchanged). */
  supersample?: number;
};

export function CrispText({
  text,
  position = [0, 0, 0],
  width,
  height,
  style,
  textClipMode,
  maxLines,
  textLineBreakMode,
  supersample = DEFAULT_SUPERSAMPLE,
}: CrispTextProps) {
  const { fontSize = 18, ...rest } = style ?? {};
  const inv = 1 / supersample;
  return (
    <ViroNode position={position} scale={[inv, inv, inv]}>
      <ViroText
        text={text}
        width={width * supersample}
        height={height * supersample}
        textClipMode={textClipMode}
        maxLines={maxLines}
        textLineBreakMode={textLineBreakMode}
        style={{ ...rest, fontSize: fontSize * supersample }}
      />
    </ViroNode>
  );
}

export default CrispText;
