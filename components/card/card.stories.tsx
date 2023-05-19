import React from 'react';
import { Meta } from '@storybook/react';

import { Card } from './card';

export default {
	title: 'Card',
	component: Card,
	tags: ['autodocs'],
} as Meta;

export const Default = () => (
	<Card>
		<Card.Header>Card header</Card.Header>
		Card content
	</Card>
);
