import { renderHook } from '@testing-library/react';
import { FilterItemMock, SelectedFiltersMock } from 'mocks/store';
import { useStore } from 'store/index';
import { useSelectedSubFiltersAmount } from './use-selected-sub-filters-amount';

jest.mock('next/router', () => ({
	query: {},
	push: jest.fn(),
}));

describe('useSelectedSubFiltersAmount hook', () => {
	it('should amount of filters that have been selected', () => {
		useStore.setState({ filters: SelectedFiltersMock });

		const { result } = renderHook(() =>
			useSelectedSubFiltersAmount(FilterItemMock.children)
		);
		expect(result.current).toBe(2);
	});

	it('should return 0 if selected filters are empty', () => {
		useStore.setState({ filters: {} });

		const { result } = renderHook(() =>
			useSelectedSubFiltersAmount(FilterItemMock.children)
		);
		expect(result.current).toBe(0);
	});
});
