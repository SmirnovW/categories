import React from 'react';
import { Meta } from '@storybook/react';

import { Text } from './text';

export default {
	title: 'Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {
		size: {
			defaultValue: 'big',
			options: ['big', 'medium', 'small'],
			control: {
				type: 'select',
			},
		},
		weight: {
			defaultValue: 'regular',
			options: ['bold', 'regular', 'medium'],
			control: {
				type: 'select',
			},
		},
		color: {
			defaultValue: 'black',
			options: [
				'black',
				'white',
				'main-accent',
				'second-accent',
				'main-medium',
				'main-light',
				'main-dark',
			],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Default = (props) => <Text {...props}>This is the text</Text>;
