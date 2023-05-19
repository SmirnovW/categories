import React, { MouseEvent, useEffect, useMemo, useState } from 'react';

import { Label } from 'components/label/label';
import { useStore } from 'store';
import { useTranslate } from 'hooks/use-translate';

import styles from './selected-filters.module.css';

/**
 * SelectedFilters Component
 */
export const SelectedFilters: React.FC = () => {
	const translate = useTranslate();
	const { filters, deleteFilters } = useStore();
	const [internalFilters, setInternalFilters] = useState<
		Record<string, string>
	>({});

	useEffect(() => {
		setInternalFilters(filters);
	}, [filters]);

	const filtersKeys = useMemo(
		() => Object.keys(internalFilters),
		[internalFilters]
	);

	const onDeleteFilter = (event: MouseEvent<HTMLInputElement>) => {
		deleteFilters([event.currentTarget.value]);
	};

	const deleteAllFilters = () => {
		deleteFilters(filtersKeys);
	};

	return filtersKeys.length ? (
		<ul className={styles.container}>
			{Object.keys(internalFilters).map((key) => (
				<li key={key} className={styles.filter}>
					<Label
						value={key}
						name={internalFilters[key]}
						onClick={onDeleteFilter}
						closeButton
					>
						{internalFilters[key]}
					</Label>
				</li>
			))}
			{filtersKeys.length > 1 && (
				<li className={styles.filter}>
					<Label
						onClick={deleteAllFilters}
						name="delete_all"
						closeButton
					>
						{translate('delete_all')}
					</Label>
				</li>
			)}
		</ul>
	) : null;
};
