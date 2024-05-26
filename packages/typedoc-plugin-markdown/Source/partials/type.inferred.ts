import type { InferredType } from "typedoc";
import { escapeChars } from "../support/utils";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function inferredType(
	context: MarkdownThemeRenderContext,
	model: InferredType,
) {
	return `infer ${escapeChars(model.name)}`;
}
