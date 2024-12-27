export type PaginationOptions = {
	// requested page
	page: number;
	// events per page
	limit: number;
};

export type PaginatedResponse<T> = {
	docs: Array<T>;
	totalDocs: number;
	// used events per page number
	limit: number;
	// current page number
	page: number;
	// total number of pages for matching events
	totalPages: number;
	// is previous page exists (i.e. false for page 1)
	hasPrevPage: boolean;
	// is next page exists (i.e. false for last page)
	hasNextPage: boolean;
	// previous page number
	prevPage: number;
	// next page number
	nextPage: number;
};
