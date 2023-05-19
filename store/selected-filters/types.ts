export type CategoryType = {
	id: string;
	count: number;
	parent: string;
	name: string;
	children: CategoryType[];
};

export type CategoriesList = CategoryType[];

export interface SelectedFiltersStore {
	filters: Record<string, string>;
	deleteFilters: (filterKey: string[]) => void;
	setFilters: (filter: Record<string, string>) => void;
}
