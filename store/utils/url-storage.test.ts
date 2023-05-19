import { ApplicationStore } from 'store/types';
import { StorageValue } from 'zustand/middleware/persist';
import Router from 'next/router';

import { STORAGE_NAME, urlStorage } from './url-storage';

jest.mock('next/router', () => ({
	push: jest.fn(),
	pathname: '/',
	query: {},
}));

describe('urlStorage', () => {
	const mockPush = Router.push as jest.Mock;
	beforeEach(() => {
		mockPush.mockClear();
	});

	it('should correctly parse filters from the URL', () => {
		Router.query = { filters: '1-filter1,2-filter2' };
		const filters = urlStorage.getItem(STORAGE_NAME);

		expect(filters).toEqual({
			state: {
				filters: {
					1: 'filter1',
					2: 'filter2',
				},
			},
		});
	});

	it('should not parse filters if storage name is not "url-storage"', () => {
		const filters = urlStorage.getItem('storage');

		expect(filters).toEqual({
			state: {},
		});
	});

	it('should correctly set filters in the URL', () => {
		const newValue: StorageValue<Partial<ApplicationStore>> = {
			state: {
				filters: {
					1: 'filter1',
					2: 'filter2',
				},
			},
		};

		urlStorage.setItem(STORAGE_NAME, newValue);

		expect(mockPush).toHaveBeenCalledWith(
			{
				pathname: '/',
				query: {
					filters: '1-filter1,2-filter2',
				},
			},
			'',
			{
				shallow: true,
			}
		);
	});

	it('should not set filters in the URL if storageName is not "url-storage"', () => {
		const newValue: StorageValue<Partial<ApplicationStore>> = {
			state: {
				filters: {
					1: 'filter1',
					2: 'filter2',
				},
			},
		};

		urlStorage.setItem('storage', newValue);

		expect(mockPush).not.toHaveBeenCalled();
	});

	it('should correctly remove filters from the URL', () => {
		urlStorage.removeItem(STORAGE_NAME);

		expect(mockPush).toHaveBeenCalledWith(
			{
				pathname: '/',
				query: '',
			},
			'',
			{
				shallow: true,
			}
		);
	});

	it('should not remove filters from the URL if storageName is not "url-storage"', () => {
		urlStorage.removeItem('storage');

		expect(mockPush).not.toHaveBeenCalled();
	});
});
