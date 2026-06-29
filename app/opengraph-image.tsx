import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.ogAlt;

export default function OpengraphImage() {
  return renderOgImage();
}
