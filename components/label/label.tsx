import React, { MouseEvent, PropsWithChildren } from 'react';
import { Text } from 'components/text';
import { Icon } from 'components/icon';

import { LABEL_CONTROL_TEST_ID } from './constants';
import styles from './label.module.css';

type Props = {
	name?: string;
	value?: string;
	closeButton?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Label Component
 */
export const Label: React.FC<PropsWithChildren<Props>> = ({
	name = '',
	value = '',
	children,
	closeButton = false,
	onClick,
}) => {
	return (
		<button
			name={name}
			value={value}
			onClick={onClick}
			className={styles.container}
			data-testid={`${LABEL_CONTROL_TEST_ID}${name}`}
		>
			<Text as="span" color="white">
				{children}
			</Text>
			{closeButton && <Icon className={styles.icon} name="Close" />}
		</button>
	);
};
