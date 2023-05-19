import React, { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './text.module.css';

export interface Props extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	className?: string;
	as?: string;
	weight?: FontWeightType;
	size?: FontSizesType;
	color?: ColorType;
}

/**
 * Text Component
 */
export const Text: React.FC<PropsWithChildren<Props>> = (props) => {
	const {
		children,
		className = '',
		as = 'div',
		size = 'medium',
		color = 'black',
		weight = 'regular',
		...restProps
	} = props;

	const finalClassName = classNames(
		className,
		color,
		styles[size],
		styles[weight]
	);

	return React.createElement(
		as,
		{
			...restProps,
			style: {
				...props.style,
			},
			className: finalClassName,
		},
		children
	);
};
