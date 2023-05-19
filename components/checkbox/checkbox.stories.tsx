import React from 'react';
import { Meta } from '@storybook/react';

import { Checkbox } from './checkbox';

export default {
	title: 'Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		label: {
			defaultValue: 'Label',
			control: {
				type: 'text',
			},
		},
		checked: {
			defaultValue: true,
			control: {
				type: 'boolean',
			},
		},
	},
	args: {
		label: 'Label',
	},
} as Meta;

export const Default = (props) => <Checkbox {...props} />;
