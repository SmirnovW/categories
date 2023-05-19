import { PersistStorage } from 'zustand/middleware';
import { ApplicationStore } from 'store/types';
import { StorageValue } from 'zustand/middleware/persist';
import Router from 'next/router';

export const STORAGE_NAME = 'url-storage';

export const urlStorage: PersistStorage<Partial<ApplicationStore>> = {
	getItem: (storageName: string): StorageValue<Partial<ApplicationStore>> => {
		if (storageName === STORAGE_NAME) {
			const filters = {};

			const query = new URLSearchParams(Router.query);
			const filtersQueryString = query.get('filters');

			filtersQueryString.split(',').forEach((filterString) => {
				const [filterId, filterName] = filterString.split('-');
				filters[filterId] = filterName;
			});

			return {
				state: { filters },
			};
		}
		return {
			state: {},
		};
	},
	setItem: (storageName, newValue): void => {
		if (storageName === STORAGE_NAME) {
			const mappedFilters = Object.keys(newValue.state.filters).map(
				(key) => {
					return `${key}-${newValue.state.filters[key]}`;
				}
			);
			Router.push(
				{
					pathname: Router.pathname,
					query: mappedFilters.length
						? { filters: `${mappedFilters.join(',')}` }
						: {},
				},
				'',
				{
					shallow: true,
				}
			);
		}
	},
	removeItem: (storageName): void => {
		if (storageName === STORAGE_NAME) {
			const queryParams = new URLSearchParams(Router.query);
			queryParams.delete('filters');
			Router.push(
				{
					pathname: Router.pathname,
					query: queryParams.toString(),
				},
				'',
				{
					shallow: true,
				}
			);
		}
	},
};
