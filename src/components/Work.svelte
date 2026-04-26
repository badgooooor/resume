<script lang="ts">
	import Hideable from './Hideable.svelte';
	import RichText from './RichText.svelte';

	export let position: string = '';
	export let company: string = '';
	export let companyDescription: string | undefined = undefined;
	export let url: string = '';
	export let years: string[] = [];
	export let details: string[] = [];
	export let hide: boolean = false;
</script>

<div class="work-experience">
	<Hideable {hide}>
		<div class="experience-header flex font-bold mb-2 print:mb-1 items-start gap-x-2 print:gap-x-1 print:text-[11px]">
			<div class="flex-1 text-left min-w-0">{position}</div>
			<div class="flex-1 text-center px-1 min-w-0">
				<a class="company-link" href={url} target="_blank" rel="noreferrer">{company}</a>
				{#if companyDescription}
					<div
						class="company-tagline block font-normal font-sans text-xs sm:text-sm print:text-[9px] text-slate-600 print:text-slate-700 mt-0.5 leading-tight print:mt-1"
					>
						{companyDescription}
					</div>
				{/if}
			</div>
			<div class="flex-1 text-right whitespace-nowrap">{years.join('-')}</div>
		</div>
		<ul class="text-left list-disc pl-8 print:pl-6 mt-1 print:mt-0.5">
			{#each details as detail}
				<Hideable>
					<li class="print:text-[11px] print:leading-snug">
						<RichText text={detail} />
					</li>
				</Hideable>
			{/each}
		</ul>
	</Hideable>
</div>

<style lang="postcss">
	.work-experience {
		@apply my-4;
	}

	.company-link {
		text-decoration: underline;
	}

	@media print {
		.work-experience {
			@apply my-1.5;
		}

		.company-link {
			text-decoration: none;
			font-weight: 700;
			border-bottom: 0.5pt solid #333;
		}

		.company-tagline {
			line-height: 1.05;
		}
	}
</style>
