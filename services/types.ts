export type CategoryItemResponse = {
	id: string;
	count: number;
	parent: string;
	name: string;
};

export type CategoriesListResponse = CategoryItemResponse[];
