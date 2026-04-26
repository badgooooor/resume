<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Kofi from './Kofi.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;

	$: dataLink = `${sourceLink}/blob/main/static/data/profile.json`;
	$: ({
		intro = {} as IProfileResp['intro'],
		summary = undefined as IProfileResp['summary'],
		projects = [],
		technologies = [],
		workExperiences = [],
		educations = [],
		interests = [],
		openSourceContributions = [],
		resumeUrl: { sourceLink = '' } = {}
	} = profile || {});

	$: allInterestsHidden = interests.length > 0 && interests.every((i) => i.hide);

	onMount(async () => (profile = await fetchResumeProfile()));

	async function fetchResumeProfile() {
		const resp = await fetch('/data/profile.json');
		return await resp.json();
	}
</script>

<!-- Remove this is you does not want Kofi widget on your site -->
<!-- {#if intro.github == 'narze'}
	<Kofi name={intro.github} />
{/if} -->

<header class="web-only text-center p-4 sm:p-6 bg-green-400 text-white w-screen">
	<h1 class="text-4xl">Resumette</h1>
	<h3>
		<button on:click={() => window.print()} class="underline text-lg">[Print]</button>
	</h3>
	<p>
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden
		on print.
	</p>
	<p>You can click at any sections or lines hide some information before printing.</p>
	<a href={sourceLink} target="_blank" rel="noopener">[Source]</a>
	<a href={dataLink} target="_blank" rel="noopener">[Data]</a>
</header>

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl">
	<Intro {...intro} />

	{#if summary}
		<section>
			<Hideable hide={summary.hide}>
				<h2 class="text-2xl print:text-sm uppercase text-left">Summary</h2>
				<hr />
				<p class="text-left summary-body print:text-[11px] print:leading-snug">
					{summary.value}
				</p>
			</Hideable>
		</section>
	{/if}

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-sm uppercase text-left">Technologies and Languages</h2>
			<hr />
			<ul class="text-left list-disc pl-8">
				{#each technologies as tech}
					<Hideable>
						<li class="print:text-[11px] print:leading-snug">
							<span class="inline-block font-medium">{tech.section}</span>
							<span>{tech.details}</span>
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-sm uppercase text-left">Education</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each educations as edu}
					<Hideable>
						<li class="print:text-[11px]">
							<strong>{edu.head}</strong>{#if edu.honors}, <em>{edu.honors}</em>{/if}, {edu.details}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-sm uppercase text-left">Work Experience</h2>
			<hr />

			{#each workExperiences as exp}
				<Work {...exp} />
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-sm uppercase text-left">Projects</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each projects as project}
					<Hideable hide={project.hide}>
						<li>
							<strong
								><a href={project.url} target="_blank" rel="noreferrer">{project.name}</a></strong
							>
							- {project.details}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-sm uppercase text-left">Open Source Contributions</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each openSourceContributions as contrib}
					<Hideable hide={contrib.hide}>
						<li>
							<strong
								><a href={contrib.projectUrl} target="_blank" rel="noreferrer"
									>{contrib.project}</a
								></strong
							>
							- {contrib.details}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable hide={allInterestsHidden}>
			<h2 class="text-2xl print:text-sm uppercase text-left">Interests</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each interests as interest}
					<Hideable hide={interest.hide}>
						<li>
							{interest.value}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>
</main>

<style lang="postcss">
	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-4;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
	}

	@media print {
		:global(.web-only) {
			display: none;
		}

		main {
			margin: 0;
			padding: 0;
			max-width: none;
			@apply text-[11px] leading-snug text-black;
		}

		section {
			@apply my-2;
		}

		section hr {
			@apply mt-0 mb-1 border-slate-400;
		}

		ul {
			@apply pl-6;
		}

		main a {
			text-decoration: none;
			color: inherit;
			border-bottom: 0.5pt solid #999;
		}
	}
</style>
