import React from 'react';

import styles from './divider.module.css';

type Props = {
	color?: ColorType;
};

/**
 * Divider Component
 */
export const Divider: React.FC<Props> = ({ color = 'black' }) => {
	return <hr className={`${styles.divider} ${color}`} />;
};
