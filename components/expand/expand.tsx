import React, { PropsWithChildren, useState, useRef, useEffect } from 'react';

import styles from './expand.module.css';

type Props = {
	expanded: boolean;
	duration?: number;
};

export const EXPAND_WRAPPER_TEST_ID = 'expand-component-wrapper';
export const EXPAND_CONTENT_TEST_ID = 'expand-component-content';

/**
 * Expand Component
 */
export const Expand: React.FC<PropsWithChildren<Props>> = ({
	children,
	expanded = false,
	duration = 0.5,
}) => {
	const [height, setHeight] = useState('0');
	const contentRef = useRef();
	const timer = useRef<number>();

	useEffect(() => {
		window.clearTimeout(timer.current);

		if (contentRef?.current) {
			const boundary = (
				contentRef.current as HTMLElement
			).getBoundingClientRect();

			if (expanded) {
				setHeight(`${boundary.height}px`);

				timer.current = window.setTimeout(() => {
					setHeight('auto');
				}, 1000);
			} else {
				setHeight(`${boundary.height}px`);

				timer.current = window.setTimeout(() => {
					setHeight('0px');
				}, 100);
			}
		}
	}, [contentRef.current, expanded]);

	return (
		<div
			data-testid={EXPAND_WRAPPER_TEST_ID}
			style={{
				transition: `height ${duration}s ease-in-out 0s`,
				height: height,
			}}
			className={styles.wrapper}
		>
			<div data-testid={EXPAND_CONTENT_TEST_ID} ref={contentRef}>
				{children}
			</div>
		</div>
	);
};
