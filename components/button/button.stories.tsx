import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from './button';

export default {
	title: 'Button',
	component: Button,
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
			defaultValue: 'main-medium',
			options: ['main-medium'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Default = (props) => <Button {...props}>Click me!</Button>;
