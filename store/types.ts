import { SelectedFiltersStore } from 'store/selected-filters';
import { CategoriesStore } from 'store/categories';

export type FilterItemType = {
	id: string;
	count: number;
	parent: string;
	name: string;
	children: FilterItemType[];
};

export type ApplicationStore = CategoriesStore & SelectedFiltersStore;
