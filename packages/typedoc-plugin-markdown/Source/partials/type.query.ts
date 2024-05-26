import type { QueryType } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function queryType(
	context: MarkdownThemeRenderContext,
	queryType: QueryType,
) {
	return `typeof ${context.partials.someType(queryType.queryType)}`;
}
