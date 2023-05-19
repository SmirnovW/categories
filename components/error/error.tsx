import React from 'react';
import { useRouter } from 'next/router';
import { Card } from 'components/card';
import { Text } from 'components/text';
import { Button } from 'components/button';
import { useTranslate } from 'hooks/use-translate';

import styles from './error.module.css';

/**
 * Error Component
 */
export const Error: React.FC = () => {
	const router = useRouter();
	const translate = useTranslate();

	const tryAgain = () => {
		router.reload();
	};

	return (
		<div className={styles.container}>
			<Card justify="center" align="center">
				<Text as="h2" className={styles.text}>
					{translate('oops')}
				</Text>
				<Button color="main-accent" onClick={tryAgain}>
					{translate('try_again')}
				</Button>
			</Card>
		</div>
	);
};
