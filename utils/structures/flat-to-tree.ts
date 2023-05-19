import { sortedPush } from "utils/structures/sorted-push";

type FlatItem = {
  id: string;
  parent: string;
  name: string;
};
export function flatToTree<P extends FlatItem>(flat: P[]) {
  const tree = [];

  const mappedCollection = {};

  flat.forEach((category: P) => {
    const { id, parent } = category;
    if (!mappedCollection[id]) {
      mappedCollection[id] = { ...category, children: [] };
    }

    if (mappedCollection[id] && !mappedCollection[id].id) {
      mappedCollection[id] = { ...mappedCollection[id], ...category };
    }

    if (!mappedCollection[parent]) {
      mappedCollection[parent] = {
        children: [mappedCollection[id]],
      };
    } else {
      sortedPush<P>(
        mappedCollection[parent].children,
        mappedCollection[id],
        (a, b) => {
          return a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase();
        }
      );
    }
    if (parent === "0") {
      tree.push(mappedCollection[id]);
    }
  });

  return tree;
}
