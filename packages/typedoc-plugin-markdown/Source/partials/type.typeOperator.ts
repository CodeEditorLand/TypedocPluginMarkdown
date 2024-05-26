import type { TypeOperatorType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function typeOperatorType(
	context: MarkdownThemeRenderContext,
	model: TypeOperatorType,
) {
	return `${model.operator} ${context.partials.someType(model.target)}`;
}
