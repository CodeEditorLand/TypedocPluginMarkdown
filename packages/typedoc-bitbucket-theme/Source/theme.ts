import type { Renderer } from "typedoc";
import { MarkdownTheme } from "typedoc-plugin-markdown";

export class BitbucketTheme extends MarkdownTheme {
	constructor(renderer: Renderer) {
		super(renderer);
	}
	toAnchorRef(reflectionId: string) {
		return "markdown-header-" + reflectionId;
	}
}
