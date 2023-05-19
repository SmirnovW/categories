import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectedFiltersStore } from 'store/selected-filters';
import { createCategoriesStore } from 'store/categories';
import { ApplicationStore } from 'store/types';
import { partialize, urlStorage } from 'store/utils';

export const useStore = create<ApplicationStore>()(
	persist(
		(...a) => ({
			...createCategoriesStore(...a),
			...createSelectedFiltersStore(...a),
		}),
		{
			name: 'url-storage',
			storage: urlStorage,
			partialize,
		}
	)
);
