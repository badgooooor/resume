export type TextSegment =
	| { type: 'text'; value: string }
	| { type: 'bold'; value: string };

/** Parses `**like this**` into segments for résumé keyword emphasis. */
export function parseInlineBold(input: string): TextSegment[] {
	if (!input) return [{ type: 'text', value: '' }];

	const segments: TextSegment[] = [];
	const re = /\*\*([^*]+)\*\*/g;
	let lastIndex = 0;
	let m: RegExpExecArray | null;

	while ((m = re.exec(input)) !== null) {
		if (m.index > lastIndex) {
			segments.push({ type: 'text', value: input.slice(lastIndex, m.index) });
		}
		segments.push({ type: 'bold', value: m[1] });
		lastIndex = m.index + m[0].length;
	}

	if (lastIndex < input.length) {
		segments.push({ type: 'text', value: input.slice(lastIndex) });
	}

	if (segments.length === 0) {
		return [{ type: 'text', value: input }];
	}

	return segments;
}
