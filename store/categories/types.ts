import { FilterItemType } from 'store/types';

export type CategoriesList = FilterItemType[];

export interface CategoriesStore {
	categories: CategoriesList;
	setCategories: (categories: CategoriesList) => void;
}
