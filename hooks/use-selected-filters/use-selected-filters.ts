import { useStore } from 'store';

export function useSelectedFilters(filterId: string) {
	const { filters } = useStore();

	return Boolean(filters[filterId]);
}
