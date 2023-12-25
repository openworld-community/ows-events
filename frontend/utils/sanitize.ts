import sanitizeHtml from 'sanitize-html';

const options = {
	allowedTags: [
		"address", "article", "aside", "h1", "h2", "h3", "h4", "h5", "h6", "section", "blockquote",
		"dd", "div", "dl", "dt", "hr", "li", "ol", "p", "pre", "ul", "a", "b", "br", "cite", "data",
		"em", "i", "mark", "q", "s", "small", "span", "strong", "sub", "sup", "time", "caption",
		"col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
	],
	nonBooleanAttributes: [
		'alt', 'autocapitalize', 'autocomplete', 'cols', 'colspan', 'content', 'contenteditable',
		'data', 'datetime', 'download', 'for', 'height', 'href', 'hreflang', 'id',
		'itemprop', 'itemref', 'itemtype', 'rel', 'rows', 'rowspan', 'span', 'src',
		'target', 'title', 'width'
	],
	allowedAttributes: {
		a: [ 'href', 'name', 'target' ],
		img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height' ]
	},
	selfClosing: [ 'img', 'br', 'hr' ],
	allowedSchemes: [ 'https', 'mailto', 'tel' ],
	allowedSchemesByTag: {},
	allowedSchemesAppliedToAttributes: [ 'href', 'src' ],
	allowProtocolRelative: true,
	enforceHtmlBoundary: false,
	parseStyleAttributes: true,
	transformTags: {
		'a': sanitizeHtml.simpleTransform('a', {target: '_blank'})
	}
}

export const useSanitizer = (htmlBlock: string): string => {
	 return sanitizeHtml(htmlBlock, options)
}