import { useStore } from 'store';
import { FilterItemType } from 'store/types';
import { useMemo } from 'react';

export function useSelectedSubFiltersAmount(filtersList: FilterItemType[]) {
	const { filters } = useStore();

	return useMemo(() => {
		let amount = 0;
		filtersList.forEach((filter) => {
			if (filters[filter.id]) {
				amount += 1;
			}
		});
		return amount;
	}, [filters]);
}
