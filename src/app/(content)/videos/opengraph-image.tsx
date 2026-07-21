import { ogImage } from "@/lib/og";
import { getPage } from "@/lib/pages";

export const alt = getPage("videos").h1;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage("videos");
}
