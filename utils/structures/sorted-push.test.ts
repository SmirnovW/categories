import { sortedPush } from './sorted-push';

describe('sortedPush', () => {
	const compare = (a, b) => {
		return a > b;
	};

	it('should add a number at second position', () => {
		expect(sortedPush([1, 3, 4, 5], 2, compare)).toEqual([1, 2, 3, 4, 5]);
	});

	it('should add a number to the end of the array', () => {
		expect(sortedPush([1, 2, 3, 4, 5], 7, compare)).toEqual([
			1, 2, 3, 4, 5, 7,
		]);
	});

	it('should add a letter at the second position', () => {
		expect(sortedPush(['a', 'c', 'd', 'f'], 'b', compare)).toEqual([
			'a',
			'b',
			'c',
			'd',
			'f',
		]);
	});
});
