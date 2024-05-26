import type { UnionType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function unionType(
	context: MarkdownThemeRenderContext,
	unionType: UnionType,
	emphasis: boolean,
) {
	return unionType.types
		.map((unionType) =>
			context.partials.someType(unionType, "none", emphasis),
		)
		.join(` \\| `);
}
