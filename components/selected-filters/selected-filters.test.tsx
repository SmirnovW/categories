import React from 'react';
import { act, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { useStore } from 'store';

import { SelectedFilters } from './selected-filters';
import { SelectedFiltersMock } from 'mocks/store';
import { Translations } from 'constants/translations';

jest.mock('next/router', () => ({
	query: {},
	push: jest.fn(),
}));

describe('<SelectedFilters />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const user = userEvent.setup();

	const state = useStore.getState();

	const deleteFiltersSpy = jest.spyOn(state, 'deleteFilters');

	test('renders no filters when there are no filters in the store', () => {
		useStore.setState({ filters: {} });

		render(<SelectedFilters />);

		expect(screen.queryByText('Heren')).toBeNull();
	});

	test('renders filters when there are filters in the store', () => {
		useStore.setState({ filters: { 123: 'Heren' } });

		render(<SelectedFilters />);

		expect(screen.getByText('Heren')).toBeInTheDocument();
	});

	test('calls deleteFilters when delete button is clicked', async () => {
		useStore.setState({ filters: { ...SelectedFiltersMock } });

		render(<SelectedFilters />);

		const element = screen.getByText('Heren');

		expect(element).toBeInTheDocument();

		await act(() => user.click(element));

		expect(deleteFiltersSpy).toHaveBeenCalledWith(['21251']);
		expect(element).not.toBeInTheDocument();
	});

	test('calls deleteFilters with all filter keys when delete all button is clicked', async () => {
		useStore.setState({ filters: { ...SelectedFiltersMock } });

		render(<SelectedFilters />);

		const element = screen.getByText(Translations.delete_all);
		await act(() => user.click(element));

		expect(deleteFiltersSpy).toHaveBeenCalledTimes(1);
		expect(deleteFiltersSpy).toHaveBeenCalledWith([
			'14096',
			'14114',
			'21251',
		]);
	});
});
