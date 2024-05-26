import type { DeclarationReflection, PageEvent } from "typedoc";
import type { MarkdownThemeRenderContext } from "../theme-context";

export function memberTemplate(
	context: MarkdownThemeRenderContext,
	page: PageEvent<DeclarationReflection>,
) {
	const md: string[] = [];

	md.push(context.partials.header(page));

	md.push(context.partials.member(page.model));

	return md.join("\n\n");
}
