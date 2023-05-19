import React from 'react';
import { Meta } from '@storybook/react';

import { Label } from './label';

export default {
	title: 'Label',
	component: Label,
	tags: ['autodocs'],
	args: {
		children: 'Text',
	},
} as Meta;

export const Default = (props) => <Label {...props} />;
