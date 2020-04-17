<script>
  import {onMount, createEventDispatcher} from 'svelte';
  import L from 'leaflet';
  import "leaflet-easybutton";

  import {sheetUrl, wines} from './store/store.js';
  import {getPopupText, wineTypeIcons, setHash, clearHash} from './utils/utils.js';

  let map;

  const dispatch = createEventDispatcher();

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';

    link.onload = () => {
      map = L.map('map').setView([25.505, 15.09], 3);

      L.tileLayer('https://c.osm.rrze.fau.de/osmhd/{z}/{x}/{y}.png', {
        attribution: `&copy; <a href='//www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors | Used icons <a href='//sergeychikin.ru/365' target='_blank'>by Sergey Chikin</a>`,
        minZoom: 2,
        maxZoom: 16,
      }).addTo(map);

      L.easyButton( '<span class="sidebar-list-icons">&equiv;</span>', function(){
          dispatch('message', {
            text: 'sidebar-collapse'
          });
      }).addTo(map);

      map.on('popupclose', clearHash);

      loadGeoData();
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };

  });

  async function loadGeoData() {
    const res = await fetch(sheetUrl);
    const data = await res.json();

    if (res.ok) {
      data.wines.forEach(function (wineReleaseItem, i, arr) {
        let entryItem = wineReleaseItem.wine;

        let wineItem = {};
        wineItem.lat = entryItem['lat'];
        wineItem.lon = entryItem['lon'];
        wineItem.grape = entryItem['grape'];
        wineItem.title = entryItem['title'];
        wineItem.vivinoUrl = entryItem['vivino-url'];
        wineItem.vivinoRating = entryItem['vivino-rating'];
        wineItem.region = entryItem['region'];
        wineItem.color = entryItem['color'];
        wineItem.coverUrl = entryItem['cover-url'];
        wineItem.releaseTitle = wineReleaseItem.release['title'];
        wineItem.releaseUrl = wineReleaseItem.release['video-url'];

        if (wineItem.lat && wineItem.lon) {
          let wine = {};
          wine.wineInfo = wineItem;

          let markerIcon = wineTypeIcons[wine.wineInfo.color];
          let marker = L.marker([wine.wineInfo.lat, wine.wineInfo.lon], {icon: markerIcon});
          marker.bindPopup(getPopupText(wineItem))
                  .on('click', onMarkerClick)
                  .addTo(map)
                  .options['id'] = i;
          wine.marker = marker;

          let newWines = [...$wines, wine];
          wines.update(wines => newWines);
        }
      });

      initPopup();

    } else {
      throw new Error(data);
    }
  }

  function onMarkerClick() {
    setHash(this.options.id);
  }

  function popupMarker(index) {
    $wines[index].marker.openPopup();
  }

  function initPopup() {
    if (window.location.hash) {
      let id = window.location.hash.replace('#', '');
      popupMarker(id);
    }
  }

  function translateCount(n, titles) {
    return titles[n%10===1 && n%100!==11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
  }

</script>


<div class="wine-map" id="map">
  <div class="wine-map-title">Парфенов выпил в «Парфеноне» {$wines.length} {translateCount($wines.length, ['вино','вина','вин'])}</div>
</div>

<style type="text/less">
  .wine-map {
    flex-grow: 3;
  }

  .wine-map-title {
    z-index: 1000;
    position: absolute;
    top: 8px;
    height: 40px;
    width: 100%;

    text-align: center;
    font-family: var(--system-font-family);
    font-weight: 600;
    font-size: 2rem;
  }

  :global(.easy-button-button) {
    margin: 0;
    height: 27px;
    width: 27px;
    border-radius: 3px;
    border: none;
    background-color: white;

    .sidebar-list-icons {
      font-size: 1.5em;
    }
  }

  :global(.wine-card) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;

    .wine-card-image {
      flex-grow: 0;
      flex-shrink: 0;
      box-sizing: border-box;
      max-width: 40px;
    }

    .wine-card-text {
      color: var(--text-color);
      padding-left: 16px;

      font-size: 14px;
      line-height: 16px;

      .wine-card-text-title {
        font-size: 1.1rem;
        line-height: 1.5rem;
        font-weight: 500;
      }

      .wine-card-text-params {
        margin-top: 4px;

        .kv-item {
          margin-top: 0;
          margin-bottom: 4px;
        }
      }

      a, .leaflet-container {
        color: var(--link-color);
        border-bottom: 1px solid var(--link-border-color);
        text-decoration: none;

        transition: .25s cubic-bezier(.33, .66, .66, 1);

        &:hover {
          color: var(--link-hover-color);
          border-bottom: 1px solid var(--link-border-hover-color);
          text-decoration: none;
          transition: .05s cubic-bezier(.33, .66, .66, 1);
        }

        img {
          text-decoration: none;
        }
      }
    }
  }

  :global(.marker-inactive) {
    filter: grayscale(1);
    -webkit-filter: grayscale(1);
    opacity: 0.25;
  }

</style>
