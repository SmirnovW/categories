import { CategoriesResponseMock } from "mocks/api";
import { FiltersMock } from "mocks/store";

import { flatToTree } from "./flat-to-tree";

describe("flatToTree", () => {
  it("should build a tree out of the flat array", () => {
    expect(flatToTree(CategoriesResponseMock)).toEqual(FiltersMock);
  });

  it("should return empty array", () => {
    expect(flatToTree([])).toEqual([]);
  });
});
