import type { IntersectionType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function intersectionType(
	context: MarkdownThemeRenderContext,
	model: IntersectionType,
) {
	return model.types
		.map((intersectionType) => context.partials.someType(intersectionType))
		.join(" & ");
}
