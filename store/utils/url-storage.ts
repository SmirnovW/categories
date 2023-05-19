import { PersistStorage } from 'zustand/middleware';
import { ApplicationStore } from 'store/types';
import { StorageValue } from 'zustand/middleware/persist';
import Router from 'next/router';

export const STORAGE_NAME = 'url-storage';

function getFiltersQuery(query: string | string[]): string {
	if (!query) return '';

	const queryFilters: string | string[] = query;

	if (Array.isArray(queryFilters)) {
		return queryFilters[0];
	}
	return queryFilters;
}

export const urlStorage: PersistStorage<Partial<ApplicationStore>> = {
	getItem: (storageName: string): StorageValue<Partial<ApplicationStore>> => {
		if (storageName === STORAGE_NAME) {
			const filters = {};

			const filtersQueryString = getFiltersQuery(Router.query['filters']);

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
			Reflect.deleteProperty(Router.query, 'filters');

			Router.push(
				{
					pathname: Router.pathname,
					query: Router.query,
				},
				'',
				{
					shallow: true,
				}
			);
		}
	},
};
