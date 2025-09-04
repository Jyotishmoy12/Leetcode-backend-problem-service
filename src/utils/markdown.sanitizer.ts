import { marked } from "marked";
import logger from "../config/logger.config";
import sanitizeHtml from "sanitize-html";
import TurnDownService from "turndown";

export async function sanitizeMarkdown(markdown: string): Promise<string> {
  if (!markdown || typeof markdown !== "string") return "";

  try {
    const convertedHtml = await marked.parse(markdown);
    const sanitizedHtml = sanitizeHtml(convertedHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "code",
        "pre",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"],
        code: ["class"],
        pre: ["class"],
        a: ["href", "target"],
      },
      allowedSchemes: ["http", "https"],
      allowedSchemesByTag: {
        img: ["http", "https"],
      },
    });
    const tds = new TurnDownService();
    return tds.turndown(sanitizedHtml);
  } catch (error) {
    logger.error("Failed to sanitize markdown", error);
    return "";
  }
}
