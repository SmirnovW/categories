import React, { useState } from 'react';
import { render, act } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './checkbox';
import { CHECK_BOX_LABEL_TEST_ID, CHECK_BOX_CHECK_TEST_ID } from './constants';

const onChangeMock = jest.fn();

const renderComponent = (label: string = '') => {
	return render(
		<Checkbox name="test" label={label} onChange={onChangeMock} />
	);
};

afterEach(() => {
	onChangeMock.mockReset();
});

describe('<Checkbox />', () => {
	const user = userEvent.setup();

	it('should call on change if clicked', async () => {
		renderComponent();
		const control = screen.getByTestId(`${CHECK_BOX_CHECK_TEST_ID}test`);

		await act(async () => await user.click(control));

		expect(onChangeMock).toHaveBeenCalled();
		expect(control).toBeChecked();
	});

	it('should render the label', async () => {
		renderComponent('label');
		const label = screen.getByTestId(`${CHECK_BOX_LABEL_TEST_ID}test`);
		expect(label).toBeInTheDocument();
	});
});
