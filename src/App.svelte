<script>
	import Sidebar from './Sidebar.svelte';
	import Map from './Map.svelte';

	let sidebarShown = true;

	function handleMessage(event) {
		if (event.detail.text === "sidebar-collapse") {
			sidebarShown = !sidebarShown;
		}
	}

</script>

<style type="text/less">
	:global(:root) {
		--text-color: black;
		--text-light-color: rgba(0, 0, 0, 0.5);
		--border-light-color: rgba(0, 0, 0, 0.2);
		--backgroundColor: rgb(250, 246, 240);
		--hover-background-color: rgba(0, 137, 255, 0.2);
		--link-color: rgb(0, 137, 255);
		--link-border-color: rgba(0, 137, 255, 0.32);
		--link-hover-color: rgb(192, 0, 0);
		--link-border-hover-color: rgba(192, 0, 0, 0.32);
		--system-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	:global(html) {
		font-family: var(--system-font-family);
		font-size: 14px;
		line-height: 16px;
	}

	:global(body) {
		padding: 0;
		margin: 0;
	}

	.wine-page-layout {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;

		width: 100vw;
		height: 100vh;
	}
</style>

<div class="wine-page-layout">
	<Sidebar sidebarShown="{sidebarShown}"/>
	<Map on:message={handleMessage}/>
</div>


