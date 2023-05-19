import React from 'react';
import { Categories } from 'components/categories';

import styles from './sidebar.module.css';

/**
 * Sidebar Component
 */
export const Sidebar: React.FC = () => {
	return (
		<aside className={styles.container}>
			<Categories />
		</aside>
	);
};
