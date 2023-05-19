import React from 'react';
import { SelectedFilters } from 'components/selected-filters/selected-filters';

import styles from './main.module.css';

/**
 * Main Component
 */
export const Main: React.FC = () => {
	return (
		<main className={styles.container}>
			<SelectedFilters />
		</main>
	);
};
