import { writable } from 'svelte/store';

export const wines = writable([]);

export const map = writable();

export const sheetUrl = './assets/data/data.json';
