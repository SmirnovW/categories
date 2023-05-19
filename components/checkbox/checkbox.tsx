import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { Icon } from 'components/icon/icon';
import { Text } from 'components/text';

import styles from './checkbox.module.css';
import {
	CHECK_BOX_CHECK_TEST_ID,
	CHECK_BOX_CONTROL_TEST_ID,
	CHECK_BOX_LABEL_TEST_ID,
} from 'components/checkbox/constants';

type Props = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	label?: string;
	checked?: boolean;
	value?: string;
	name?: string;
};

/**
 * CheckBox Component
 */
export const Checkbox: React.FC<Props> = ({
	checked,
	name = '',
	onChange,
	label,
	value,
	className = '',
}) => {
	const finalClassName = classNames(className, styles.container);
	return (
		<div className={finalClassName}>
			<label
				className={styles.label}
				data-testid={`${CHECK_BOX_CONTROL_TEST_ID}${name}`}
			>
				<input
					onChange={onChange}
					className={styles.input}
					type="checkbox"
					name={name}
					checked={checked}
					value={value}
					data-testid={`${CHECK_BOX_CHECK_TEST_ID}${name}`}
				/>
				<span className={styles.control}>
					<span className={styles.icon}>
						<Icon name="Check" />
					</span>
				</span>
				{label && (
					<Text
						as="span"
						color="main-dark"
						className={styles.labelText}
						data-testid={`${CHECK_BOX_LABEL_TEST_ID}${name}`}
					>
						{label}
					</Text>
				)}
			</label>
		</div>
	);
};
