<script>
	// import { writable } from 'svelte/store';
	//
	// const boulders = writable([]);

	import { getContext, onDestroy } from 'svelte';
	// import { writable } from 'svelte/store';
	import { SharedDataContext } from '../context.js';

	const sharedData = getContext(SharedDataContext);

	let toggledCells = sharedData?.toggledCells ? [...sharedData.toggledCells] : [];

	console.log(sharedData)

	// Subscribe to changes in the context store's 'toggledCells'
	const unsubscribe = sharedData.subscribe(value => {
		toggledCells = value.toggledCells ? [...value.toggledCells] : [];
	});

	// Cleanup function
	onDestroy(() => {
		unsubscribe(); // Unsubscribe when the component is destroyed
	});
</script>

List of all generated boulders.

{#if $toggledCells.length > 0}
	<div id="table-container" class="overflow-x-auto">
		<table id="dataTable" class="w-full text-left text-sm">
			<thead class="bg-slate-50 text-xs uppercase text-slate-500">
				<tr class="border-b bg-white">
					<th class="px-3 py-3 lg:px-6 lg:py-3">ID</th>
					<th class="px-3 py-3 lg:px-6 lg:py-3">Name</th>
					<th class="px-3 py-3 lg:px-6 lg:py-3">Difficulty</th>
				</tr>
			</thead>
			<tbody>
				{#each $toggledCells as boulder (boulder.i)}
					<tr>
						<td class="px-3 py-1.5 lg:px-6 lg:py-3">{boulder.i}</td>
						<td class="px-3 py-1.5 lg:px-6 lg:py-3">{boulder.n}</td>
						<td class="px-3 py-1.5 lg:px-6 lg:py-3">{boulder.d}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="alert">No boulders loaded. Please refresh the page.</div>
{/if}
