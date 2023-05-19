export function sortedPush<P>(
	arr: Array<P>,
	element: P,
	compare: (a: P, b: P) => boolean
): Array<P> {
	for (let i = 0; i < arr.length; i++) {
		if (compare(arr[i], element)) {
			arr.splice(i, 0, element);
			return arr;
		}
	}
	arr.push(element);
	return arr;
}
