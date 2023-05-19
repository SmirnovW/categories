export const FilterItemMock = {
  count: 136,
  id: "14100",
  name: "Dames",
  parent: "0",
  children: [
    {
      children: [],
      count: 3,
      id: "14114",
      name: "Accessoires",
      parent: "14100",
    },
    {
      children: [],
      count: 137,
      id: "14096",
      name: "Kleding",
      parent: "14100",
    },
    { children: [], count: 1, id: "14559", name: "Sport", parent: "14100" },
  ],
};

export const FiltersMock = [
  FilterItemMock,
  { children: [], count: 154, id: "14126", name: "Kids", parent: "0" },
  {
    children: [
      { children: [], count: 0, id: "21249", name: "Shoes", parent: "21251" },
      {
        children: [],
        count: 14,
        id: "21253",
        name: "T-shirts",
        parent: "21251",
      },
    ],
    count: 14,
    id: "21251",
    name: "Heren",
    parent: "0",
  },
];

export const SelectedFiltersMock = {
  21251: "Heren",
  14114: "Accessoires",
  14096: "Kleding",
};
