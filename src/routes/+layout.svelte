<script lang="ts">
	import '../app.css';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import CursorGlow from '$lib/components/CursorGlow.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import ClickBurst from '$lib/components/ClickBurst.svelte';
	import Overdrive from '$lib/components/Overdrive.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>RISHAV KUMAR // iOS Developer</title>
</svelte:head>

<ScrollProgress />
<CursorGlow />
<CommandPalette />
<ClickBurst />
<Overdrive />
{@render children()}
