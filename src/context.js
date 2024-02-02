// context.js
import { writable } from 'svelte/store';

export const SharedDataContext = writable({
	toggledCells: new Set(),
});
