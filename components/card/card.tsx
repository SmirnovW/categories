import React, {
	HTMLAttributes,
	PropsWithChildren,
	PropsWithoutRef,
	RefAttributes,
} from 'react';
import classNames from 'classnames';

import styles from './card.module.css';
import { Divider } from 'components/divider/divider';

interface FlexPropsType {
	align?: 'start' | 'center' | 'end';
	justify?: 'start' | 'center' | 'end';
}

interface HeaderPropsType extends FlexPropsType {
	divider?: boolean;
}

interface PropsType extends HTMLAttributes<HTMLDivElement>, FlexPropsType {
	padding?: 'large' | 'medium' | 'small' | 'tiny' | 'zero';
	flexDirection?: 'row' | 'column';
	className?: string;
}

const CardHeader: React.FC<PropsWithChildren<HeaderPropsType>> = ({
	children,
	divider = true,
	align = 'start',
	justify = 'start',
}) => {
	return (
		<>
			<div
				className={classNames(
					styles.header,
					styles[`align-${align}`],
					styles[`justify-${justify}`]
				)}
			>
				{children}
			</div>
			{divider && <Divider />}
		</>
	);
};

const CardBody: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<div className={styles.body}>{children}</div>
		</>
	);
};

/**
 * Card Component
 */
export const Card = React.forwardRef<
	HTMLDivElement,
	PropsWithChildren<PropsType>
>(
	(
		{
			children,
			style = {},
			className = '',
			padding = 'large',
			flexDirection = 'column',
			align = 'start',
			justify = 'start',
			...restProps
		},
		ref
	) => {
		const finalClassName = classNames(
			className,
			styles.container,
			styles[`align-${align}`],
			styles[`justify-${align}`],
			styles[`padding-${padding}`],
			{
				[styles['direction-column']]: flexDirection === 'column',
			}
		);

		return (
			<div
				{...restProps}
				className={finalClassName}
				style={style}
				ref={ref}
			>
				{children}
			</div>
		);
	}
) as CardComponent<HTMLDivElement, PropsType>;

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<
	PropsWithoutRef<P> & RefAttributes<T>
> & {
	Header: typeof CardHeader;
	Body: typeof CardBody;
};

Card.Header = CardHeader;
Card.Body = CardBody;

Card.displayName = 'Card';
