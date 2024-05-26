import type { ArrayType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function arrayType(
	context: MarkdownThemeRenderContext,
	arrayType: ArrayType,
	emphasis: boolean,
) {
	const theType = context.partials.someType(
		arrayType.elementType,
		"none",
		emphasis,
	);
	return arrayType.elementType.type === "union"
		? `(${theType})[]`
		: `${theType}[]`;
}
