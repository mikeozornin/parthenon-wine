<script>
  import WineListCard from './WineListCard.svelte';
  import {wines} from './store/store.js';
  import {translateCount} from './utils/utils';

  let q = '';
  let filterList = $wines.sort(sortWineByName);
  let hiddenList = [];

  export let sidebarShown;

  function filterWine(wine, query) {
    let wineSearchable = [wine.wineInfo.title, wine.wineInfo.color, wine.wineInfo.region, wine.wineInfo.grape, wine.wineInfo.releaseTitle].join(' ');
    wineSearchable = normalizeTextForSearch(wineSearchable);

    let result = true;
    query.split(/(\S*(?:(['"`]).*?\2)\S*)\s?|\s/g) // Этот сложный код, чтобы разрешить поиск в кавычках
            .filter(e => e)                        // "chianti docg"
            .map(e => e.replaceAll('"', '').trim())
            .filter(e => e)
            .forEach(function (queryItem) {
              result = result && wineSearchable.includes(normalizeTextForSearch(queryItem));
            });
    return result;
  }

  function normalizeTextForSearch(value) {
    return value.normalize('NFKD').replace(/[^\w\s.-_\/]/g, '').toLocaleLowerCase();
  }

  function sortWineByName(wineA, wineB){
    let nameA = normalizeTextForSearch(wineA.wineInfo.title); //case insensitive and diacritic ignoring sort
    let nameB = normalizeTextForSearch(wineB.wineInfo.title);

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  };

  function onSearchKeyPress(e) {
    if (e.key === "Escape") {
      q = '';
    }

    filterList = q ? $wines.filter(wine => filterWine(wine, q)).sort(sortWineByName) : $wines.sort(sortWineByName);
    hiddenList = q ? $wines.filter(wine => !filterWine(wine, q)).sort(sortWineByName) : [];

    filterList.forEach(function (wine) {
      wine.marker._icon.classList.remove('marker-inactive');
    });

    hiddenList.forEach(function (wine) {
      wine.marker._icon.classList.add('marker-inactive');
    });
  }

  $: filterList = q ? $wines.filter(wine => filterWine(wine, q)).sort(sortWineByName) : $wines.sort(sortWineByName);
  $: hiddenList = q ? $wines.filter(wine => !filterWine(wine, q)).sort(sortWineByName) : [];

</script>

<div class="sidebar" data-shown="{sidebarShown}">
  <div class="filter-search">
    <input bind:value={q} type="text" class="search" autofocus placeholder="🔍 Поиск вина" on:keyup={onSearchKeyPress}>
  </div>

  <div class="wine-list">
    {#if filterList.length }
      {#each filterList as wineItem}
        <WineListCard wine={wineItem}/>
      {/each}
    {:else if q !== ''}
      <div class="not-found">Ничего не найдено</div>
    {:else}
      <div class="not-found">Вин нет</div>
    {/if}

  </div>

  <div class="footer">
    {#if hiddenList.length}
      {filterList.length} из {$wines.length} {translateCount($wines.length, ['вина','вин','вин'])}
    {:else}
      {filterList.length} {translateCount(filterList.length, ['вино','вина','вин'])}
    {/if}
  </div>
</div>

<style type="text/less">

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    height: 100vh;
    width: 25%;
    overflow-y: scroll;

    background-color: var(--backgroundColor);

    &[data-shown='false'] {
      width: 0;
    }
  }


  .wine-list {
    padding-bottom: 30px;
  }

  .filter-search {
    background-color: var(--backgroundColor);
    position: sticky;
    top: 0;

    padding: 5px 10px;
    width: calc(100% - 20px);

    .search {
      font-size: 14px;
      line-height: 20px;

      width: calc(100% - 24px);
      height: 28px;
      padding-left: 10px;
      padding-right: 10px;

      border-width: 2px;
      border-color: var(--border-light-color);

      &:focus {
        outline: none;
        border-color: var(--link-color);
      }

      &::placeholder {
        color: var(--text-light-color);
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;

    height: 20px;
    width: calc(100% - 20px);
    padding: 5px 10px;

    background-color: var(--backgroundColor);
    border-top: 1px solid var(--border-light-color);
  }

  .not-found {
    padding: 10px;
  }

</style>
