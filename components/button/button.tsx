import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './button.module.css';

type Props = {
	onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
	fill?: boolean;
	type?: 'submit' | 'reset' | 'button';
	color?: ColorType;
	weight?: 'bold' | 'regular';
	size?: 'tiny' | 'small' | 'medium' | 'big';
	align?: 'center' | 'left' | 'right';
	className?: string;
	value?: string;
	disabled?: boolean;
};

/**
 * Button Component
 */
export const Button: React.FC<PropsWithChildren<Props>> = ({
	children,
	onClick,
	type = 'button',
	fill = false,
	color = 'main-medium',
	weight = 'bold',
	size = 'medium',
	align = 'left',
	className = '',
	value = '',
	disabled = false,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={classNames(
				className,
				styles.container,
				`bg-${color}`,
				weight,
				styles[size],
				styles[align],
				{
					[styles.fill]: fill,
					[styles.disabled]: disabled,
				}
			)}
			type={type}
			value={value}
		>
			{children}
		</button>
	);
};
