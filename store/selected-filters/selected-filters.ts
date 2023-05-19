import { StateCreator } from 'zustand';
import { SelectedFiltersStore } from 'store/selected-filters/types';
import { ApplicationStore } from 'store/types';

export const createSelectedFiltersStore: StateCreator<
	ApplicationStore,
	[],
	[],
	SelectedFiltersStore | null
> = (set): SelectedFiltersStore => ({
	filters: {},
	deleteFilters: (filtersKeys) =>
		set((state) => {
			filtersKeys.forEach((key) => {
				Reflect.deleteProperty(state.filters, key);
			});
			return {
				filters: { ...state.filters },
			};
		}),
	setFilters: (selected) =>
		set((state) => ({
			filters: { ...state.filters, ...selected },
		})),
});
