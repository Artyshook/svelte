import { writable } from 'svelte/store';

export const saveClickedCellsToLocalStorage = (clickedCells) => {
    try {
        localStorage.setItem('clickedCells', JSON.stringify(Array.from(clickedCells)));
        console.log('Clicked cells saved to local storage.');
    } catch (error) {
        console.error('Error saving clicked cells to local storage:', error);
    }
};

// Check if localStorage is available, coz of SSR
const isLocalStorageAvailable = (() => {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
})();

export const clickedCells = writable(
  isLocalStorageAvailable ? new Set(JSON.parse(localStorage.getItem('clickedCells')) || []) : new Set()
);
export const boulders = writable(
  isLocalStorageAvailable ? JSON.parse(localStorage.getItem('boulders')) || [] : []
);

const generateBoulderId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};


export const selectedStart = (cellId) => {
    clickedCells.update((prevClickedCells) => {
        prevClickedCells = new Set([cellId, ...prevClickedCells]);
        saveClickedCellsToLocalStorage(prevClickedCells);
        return prevClickedCells;
    });
};

export const selectedTop = (cellId) => {
    clickedCells.update((prevClickedCells) => {
        prevClickedCells.delete(cellId);
        prevClickedCells = new Set([...prevClickedCells, cellId]);
        saveClickedCellsToLocalStorage(prevClickedCells);
        return prevClickedCells;
    });
};


export const addBoulder = (clickedCells) => {
    boulders.update((prevBoulders) => {
        const newBoulders = [
            ...prevBoulders,
            {
                id: generateBoulderId(),
                clickedCells: new Set(clickedCells),
                pathStart: null,
                pathEnd: null,
            },
        ];

        localStorage.setItem('boulders', JSON.stringify(newBoulders));

        console.log('Data saved to localStorage:', newBoulders);

        return newBoulders;
    });
};

export const removeBoulder = (boulderId) => {
    boulders.update((prevBoulders) => {
        const newBoulders = prevBoulders.filter((boulder) => boulder.id !== boulderId);
        localStorage.setItem('boulders', JSON.stringify(newBoulders));
        return newBoulders;
    });
};

