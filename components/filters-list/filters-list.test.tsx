import React from 'react';
import { act, render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { FilterItemMock } from 'mocks/store';
import { useStore } from 'store';
import {
	CHECK_BOX_CONTROL_TEST_ID,
	CHECK_BOX_LABEL_TEST_ID,
} from 'components/checkbox';
import { CHECK_BOX_CHECK_TEST_ID } from 'components/checkbox/constants';
import { FiltersList } from './filters-list';

jest.mock('next/router', () => ({
	query: {},
	push: jest.fn(),
}));

function renderComponent() {
	return render(<FiltersList data={FilterItemMock} />);
}

describe('<FiltersList />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const user = userEvent.setup();

	const state = useStore.getState();

	const setFiltersSpy = jest.spyOn(state, 'setFilters');
	const deleteFiltersSpy = jest.spyOn(state, 'deleteFilters');

	it('renders the main filter correctly', () => {
		renderComponent();

		expect(
			screen.getByTestId(`${CHECK_BOX_LABEL_TEST_ID}Dames`)
		).toBeInTheDocument();

		const checkbox = screen.getByTestId(
			`${CHECK_BOX_CONTROL_TEST_ID}Dames`
		);
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	it('calls setFilters and properly changes store', async () => {
		renderComponent();

		await act(() =>
			user.click(screen.getByTestId(`${CHECK_BOX_LABEL_TEST_ID}Dames`))
		);

		expect(useStore.getState().filters).toEqual({
			[FilterItemMock.id]: FilterItemMock.name,
		});
		expect(setFiltersSpy).toHaveBeenCalledWith({
			[FilterItemMock.id]: FilterItemMock.name,
		});
	});

	it('calls deleteFilters when the filter checkbox is unchecked', async () => {
		renderComponent();

		const checkbox = screen.getByTestId(`${CHECK_BOX_CHECK_TEST_ID}Dames`);
		await act(() => user.click(checkbox));

		expect(checkbox).toBeChecked();
		await act(() => user.click(checkbox));
		await waitFor(() => expect(checkbox).not.toBeChecked(), {
			timeout: 1000,
		});
		expect(deleteFiltersSpy).toHaveBeenCalledWith([FilterItemMock.id]);
	});

	it('calls setFilters with children filters when select all is checked', async () => {
		useStore.setState({
			filters: { [FilterItemMock.id]: FilterItemMock.name },
		});
		renderComponent();

		const selectAllCheckbox = screen.getByTestId(
			`${CHECK_BOX_CONTROL_TEST_ID}select-all-${FilterItemMock.id}`
		);

		await act(() => user.click(selectAllCheckbox));

		expect(setFiltersSpy).toHaveBeenCalledWith({
			14096: 'Kleding',
			14114: 'Accessoires',
			14559: 'Sport',
		});
	});

	it('calls deleteFilters with children filters when select all is unchecked', async () => {
		useStore.setState({
			filters: { [FilterItemMock.id]: FilterItemMock.name },
		});

		renderComponent();

		const selectAllCheckbox = screen.getByTestId(
			`${CHECK_BOX_CONTROL_TEST_ID}select-all-${FilterItemMock.id}`
		);
		await act(() => user.click(selectAllCheckbox));
		await act(() => user.click(selectAllCheckbox));

		expect(deleteFiltersSpy).toHaveBeenCalledWith([
			'14114',
			'14096',
			'14559',
		]);
	});

	it('renders sub filters when the filter checkbox is checked', async () => {
		renderComponent();

		const checkbox = screen.getByTestId(
			`${CHECK_BOX_CONTROL_TEST_ID}Dames`
		);

		expect(checkbox).not.toBeChecked();
		expect(
			screen.queryByTestId(
				`${CHECK_BOX_CONTROL_TEST_ID}select-all-${FilterItemMock.id}`
			)
		).not.toBeInTheDocument();

		expect(screen.queryByText('Accessoires')).not.toBeInTheDocument();
		expect(screen.queryByText('Kleding')).not.toBeInTheDocument();
		expect(screen.queryByText('Sport')).not.toBeInTheDocument();

		await act(() => user.click(checkbox));

		expect(screen.getByText('Accessoires')).toBeInTheDocument();
		expect(screen.getByText('Kleding')).toBeInTheDocument();
		expect(screen.getByText('Sport')).toBeInTheDocument();
		expect(
			screen.getByTestId(
				`${CHECK_BOX_CONTROL_TEST_ID}select-all-${FilterItemMock.id}`
			)
		).toBeInTheDocument();
	});
});
