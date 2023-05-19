import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useStore } from 'store';
import { Checkbox } from 'components/checkbox';
import { Expand } from 'components/expand/expand';
import { useTranslate } from 'hooks/use-translate';

import { useSelectedFilters } from 'hooks/use-selected-filters/use-selected-filters';
import { FilterItemType } from 'store/types';
import { useSelectedSubFiltersAmount } from 'hooks/use-selected-sub-filters-amount/use-selected-sub-filters-amount';
import styles from './filters-list.module.css';

type Props = {
	data: FilterItemType;
};

const DURATION = 0.5;

/**
 * FiltersList Component
 */
export const FiltersList: React.FC<Props> = ({ data }) => {
	const { setFilters, deleteFilters } = useStore();
	const translate = useTranslate();
	const isFilterSelected = useSelectedFilters(data.id);
	const selectedSubFiltersAmount = useSelectedSubFiltersAmount(data.children);
	const [isChecked, setChecked] = useState(false);
	const [isExpanded, setExpanded] = useState(false);
	const timer = useRef<number>();

	useEffect(() => {
		if (isFilterSelected) {
			select(true, data.id, data.name);
		} else {
			select(false, data.id, data.name);
		}
	}, [isFilterSelected]);

	const selectAll = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.checked) {
			deselectChildrenFilters();
		} else {
			selectChildrenFilters();
		}
	};

	const deselectCurrentFilter = (filterId: string) => {
		setChecked(false);
		deleteFilters([filterId]);
	};

	const select = (checked: boolean, value: string, name: string) => {
		if (checked === isChecked) return;
		window.clearTimeout(timer.current);

		setExpanded(checked);

		if (!checked) {
			if (data.children.length) {
				deselectChildrenFilters();

				timer.current = window.setTimeout(() => {
					deselectCurrentFilter(value);
				}, DURATION * (1000 + selectedSubFiltersAmount * 100));
			} else {
				deselectCurrentFilter(value);
			}
		} else {
			setChecked(true);
			setFilters({ [value]: name });
		}
	};

	const selectChildrenFilters = () => {
		const filters = {};
		data.children.forEach((filter) => {
			filters[filter.id] = filter.name;
		});
		setFilters(filters);
	};

	const deselectChildrenFilters = () => {
		const filters = [];
		data.children.forEach((filter) => {
			filters.push(filter.id);
		});
		deleteFilters(filters);
	};

	const onClick = (event: ChangeEvent<HTMLInputElement>) => {
		select(event.target.checked, event.target.value, event.target.name);
	};

	return (
		<div className={styles.container}>
			<Checkbox
				checked={isChecked}
				onChange={onClick}
				name={data.name}
				label={data.name}
				value={data.id}
			/>
			{data.children.length && isChecked ? (
				<Expand expanded={isExpanded} duration={DURATION}>
					<ul
						className={styles.subFilters}
						role="tree"
						aria-labelledby={data.name}
						aria-expanded={isExpanded}
					>
						{data.children.map((item) => (
							<li
								className={styles.subFiltersItem}
								key={item.id}
								role="treeitem"
							>
								<FiltersList data={item} />
							</li>
						))}
						<li className={styles.subFiltersItem}>
							<Checkbox
								className={styles.container}
								onChange={selectAll}
								name={`select-all-${data.id}`}
								label={translate('select_all')}
								value="select_all"
							/>
						</li>
					</ul>
				</Expand>
			) : null}
		</div>
	);
};
