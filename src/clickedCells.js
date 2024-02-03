import { writable } from 'svelte/store';

export const clickedCells = writable(new Set());
export const boulders = writable([]);

const generateBoulderId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const addBoulder = (clickedCells) => {
    boulders.update((prevBoulders) => [
        ...prevBoulders,
        {
            id: generateBoulderId(),
            clickedCells: new Set(clickedCells),
            pathStart: null,
            pathEnd: null,
        },
    ]);
};

export const removeBoulder = (boulderId) => {
    clickedCells.update((prevBoulders) =>
        prevBoulders.filter((boulder) => boulder.id !== boulderId)
    );
};
