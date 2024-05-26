import type { TupleType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function tupleType(
	context: MarkdownThemeRenderContext,
	tupleType: TupleType,
) {
	return `[${tupleType.elements
		.map((element) => context.partials.someType(element))
		.join(", ")}]`;
}
