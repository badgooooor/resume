<script lang="ts">
	export let name: string = 'Yuttakhan Baingern';
	export let nickname: string = 'Bier';
	export let phone: string = '';
	export let email: string = 'yuttakhanbaingen@gmail.com';
	export let github: string = 'badgoooor';
	export let linkedin: string = 'yuttakhan-baingern-794853167';
	export let location: string = '';
	export let website: string = 'https://yuttakhanb.dev';

	$: websiteHref =
		website.startsWith('http://') || website.startsWith('https://')
			? website
			: `https://${website}`;
	$: websiteDisplay = website.replace(/^https?:\/\//, '');
</script>

<div class="intro flex flex-wrap flex-col sm:flex-row print:flex-row text-sm sm:text-base">
	<div
		class="flex-1 text-left sm:py-4 w-48 print:text-[10px] print:leading-snug print:py-2"
	>
		<p><a href={`tel:${phone}`}>{phone}</a></p>
		<p><a href={`mailto:${email}`}>{email}</a></p>
		<p>{location}</p>
	</div>

	<h2
		class="flex-none order-first sm:order-none print:order-none text-4xl sm:text-2xl md:text-3xl lg:text-6xl text-center p-4 print:pt-0"
	>
		{name}
		<span class="block -mt-1 text-base lg:text-lg">({nickname})</span>
	</h2>

	<div
		class="flex-1 text-left sm:text-right print:text-right sm:py-4 w-48 text-sm sm:text-base print:text-[10px] print:leading-snug print:py-2"
	>
		<p>
			<a href={`https://github.com/${github}`} target="_blank" rel="noreferrer"
				>github.com/{github}</a
			>
		</p>
		<p>
			<a href={websiteHref} target="_blank" rel="noreferrer">{websiteDisplay}</a>
		</p>
		<p>
			<a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">Linkedin</a>
		</p>
	</div>
</div>

<style lang="postcss">
	a {
		text-decoration: underline;
	}

	@media print {
		.intro a {
			text-decoration: none;
			border-bottom: 0.5pt solid #999;
		}
	}
</style>
