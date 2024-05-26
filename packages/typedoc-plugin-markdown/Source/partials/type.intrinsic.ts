import type { IntrinsicType } from "typedoc";
import { escapeChars } from "../support/utils";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function intrinsicType(
	context: MarkdownThemeRenderContext,
	model: IntrinsicType,
	emphasis: boolean,
) {
	return emphasis ? `\`${model.name}\`` : escapeChars(model.name);
}
