import { API_URL } from 'constants/api';
import { CategoriesListResponse } from 'services/types';

export async function fetchCategories(): Promise<{
	data: CategoriesListResponse;
}> {
	const response = await fetch(`${API_URL}/categories`);
	return await response.json();
}
