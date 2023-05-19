import React from 'react';
import { Meta } from '@storybook/react';

import { Icon } from './icon';

export default {
	title: 'Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		name: {
			defaultValue: 'Check',
			options: ['Check', 'Close'],
			control: {
				type: 'select',
			},
		},
	},
	args: {
		name: 'Check',
	},
} as Meta;

export const Default = (props) => <Icon {...props} />;
