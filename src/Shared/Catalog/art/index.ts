import type {Art} from "../ArtKit.tsx";
import formButtons from "./formButtons.tsx";
import surfacesNavigation from "./surfacesNavigation.tsx";
import feedbackData from "./feedbackData.tsx";
import animations from "./animations.tsx";
import blocks from "./blocks.tsx";

/** Thumbnail for each docs page, keyed by the last segment of its URL, e.g. "input-text". */
export const catalogArt: Record<string, Art> = {...formButtons, ...surfacesNavigation, ...feedbackData, ...animations, ...blocks};
