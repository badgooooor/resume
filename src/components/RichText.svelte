<script lang="ts">
	import { parseInlineBold } from '$lib/inlineBold';

	export let text: string = '';

	$: segments = parseInlineBold(text);
</script>

{#each segments as seg}
	{#if seg.type === 'bold'}
		<strong class="font-semibold text-inherit">{seg.value}</strong>
	{:else}
		{seg.value}
	{/if}
{/each}
