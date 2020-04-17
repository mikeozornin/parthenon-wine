import L from 'leaflet';

export function getPopupText(wine) {
  return `<div class='wine-card'>
              <img class='wine-card-image' src='./assets/wine-covers/${wine.coverUrl}'/>
              <div class='wine-card-text'>
                  <span class='wine-card-text-title'><a href='${wine.vivinoUrl}' target='_blank'>${wine.title}</a> · ${wine.vivinoRating} ★</span>
                  <div class='wine-card-text-params'>
                      <div class="kv-item">${wine.color}</div>
                      <div class="kv-item">${wine.region}</div>
                      <div class="kv-item">Виноград: ${wine.grape}</div>
                      <div class="kv-item">Выпуск: <a href='${wine.releaseUrl}'>${wine.releaseTitle}</a></div>
                  </div>
              </div>
          </div>`;
}

const wineIcon = L.Icon.extend({
  options: {
    iconSize: [24, 37],
    iconAnchor: [12, 18],
    popupAnchor: [0, -19]
  }
});

const sparklingWineIcon = L.Icon.extend({
  options: {
    iconSize: [16, 64],
    iconAnchor: [8, 32],
    popupAnchor: [0, -32]
  }
});

const sherryWineIcon = L.Icon.extend({
  options: {
    iconSize: [20, 30],
    iconAnchor: [10, 15],
    popupAnchor: [0, -15]
  }
});

export const wineTypeIcons = {
  'Красное': new wineIcon({iconUrl: './assets/icons/red.svg'}),
  'Белое': new wineIcon({iconUrl: './assets/icons/white.svg'}),
  'Оранжевое': new wineIcon({iconUrl: './assets/icons/amber.svg'}),
  'Розовое': new wineIcon({iconUrl: './assets/icons/rose.svg'}),

  'Красное игристое': new sparklingWineIcon({iconUrl: './assets/icons/red-sparkling.svg'}),
  'Белое игристое': new sparklingWineIcon({iconUrl: './assets/icons/white-sparkling.svg'}),
  'Оранжевое игристое': new sparklingWineIcon({iconUrl: './assets/icons/amber-sparkling.svg'}),
  'Розовое игристое': new sparklingWineIcon({iconUrl: './assets/icons/rose-sparkling.svg'}),

  'Красный херес': new sherryWineIcon({iconUrl: './assets/icons/red-sherry.svg'}),
  'Белый херес': new sherryWineIcon({iconUrl: './assets/icons/white-sherry.svg'}),
  'Оранжевый херес': new sherryWineIcon({iconUrl: './assets/icons/amber-sherry.svg'}),
  'Розовый херес': new sherryWineIcon({iconUrl: './assets/icons/rose-sherry.svg'}),
};

export function clearHash(e) {
  console.log(this);
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

export function setHash(hash) {
  history.pushState("", document.title, window.location.pathname + "#" + hash);
}

export function translateCount(n, titles) {
  return titles[n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}
