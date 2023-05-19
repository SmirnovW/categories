import { useStore } from 'store';
import { useEffect } from 'react';
import { fetchCategories } from 'services/categories';
import { flatToTree } from 'utils/structures/flat-to-tree';
import { CategoryItemResponse } from 'services/types';

export function useCategories() {
	const { setCategories } = useStore();

	useEffect(() => {
		fetchCategories().then((data) => {
			const tree = flatToTree<CategoryItemResponse>(data.data);
			setCategories(tree);
		});
	}, []);
}
