import { writable } from 'svelte/store';

import L from 'leaflet';

export const wines = writable([]);

export const map = writable();

export const sheetUrl = './assets/data/data.json';
