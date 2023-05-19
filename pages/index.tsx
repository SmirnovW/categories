import React from 'react';
import { Sidebar } from 'components/sidebar';
import { Main } from 'components/main';
import { useCategories } from 'hooks/use-categories/use-categories';

export default function Home() {
	useCategories();
	//useFiltersTo

	return (
		<>
			<Sidebar />
			<Main />
		</>
	);
}
