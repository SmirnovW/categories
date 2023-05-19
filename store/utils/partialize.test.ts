import { ApplicationStore } from 'store/types';

import { partialize } from './partialize';
import { SelectedFiltersMock } from 'mocks/store';

describe('partialize', () => {
	it('should partialize store and return only filters', () => {
		expect(
			partialize({ filters: SelectedFiltersMock } as ApplicationStore)
		).toEqual({
			filters: SelectedFiltersMock,
		});
	});

	it('should return empty object filters are not exit', () => {
		expect(partialize({} as ApplicationStore)).toEqual({
			filters: {},
		});
	});
});
