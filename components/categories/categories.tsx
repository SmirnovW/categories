import React from "react";
import { useStore } from "store";
import { FiltersList } from "components/filters-list";

/**
 * Categories Component
 */
export const Categories: React.FC = () => {
  const { categories } = useStore();

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <FiltersList data={category} />
        </div>
      ))}
    </div>
  );
};
