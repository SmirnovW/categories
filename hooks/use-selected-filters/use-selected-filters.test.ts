import { renderHook } from '@testing-library/react';
import { useSelectedFilters } from './use-selected-filters';
import { useStore } from 'store/index';

jest.mock('next/router', () => ({
	query: {},
	push: jest.fn(),
}));

describe('useSelectedFilters hook', () => {
	it('should return TRUE if the filter id is in the filters list', () => {
		useStore.setState({ filters: { 21340: 'Jurken' } });

		const { result } = renderHook(() => useSelectedFilters('21340'));
		expect(result.current).toBe(true);
	});

	it('should return FALSE if the filter id is NOT in the filters list', () => {
		useStore.setState({ filters: { 21340: 'Jurken' } });

		const { result } = renderHook(() => useSelectedFilters('21320'));
		expect(result.current).toBe(false);
	});
});
