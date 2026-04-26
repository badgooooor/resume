import { describe, it, expect } from 'vitest';
import { parseInlineBold } from './inlineBold';

describe('parseInlineBold', () => {
	it('returns plain text when no markers', () => {
		expect(parseInlineBold('hello')).toEqual([{ type: 'text', value: 'hello' }]);
	});

	it('splits bold segments', () => {
		expect(parseInlineBold('a **b** c')).toEqual([
			{ type: 'text', value: 'a ' },
			{ type: 'bold', value: 'b' },
			{ type: 'text', value: ' c' }
		]);
	});
});
