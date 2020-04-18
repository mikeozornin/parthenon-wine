<script>
  import {setHash} from './utils/utils.js'

  export let wine;

  function handleClick() {
    wine.marker.openPopup();
    setHash(wine.marker.options.id);
  }

</script>

<div class='wine-card' on:click={handleClick}>
  <img class='wine-card-image' src='./assets/wine-covers/{wine.wineInfo.coverUrl}'/>
  <div class='wine-card-text'>
        <span class='wine-card-text-title'><a href='{wine.wineInfo.vivinoUrl}'
                                              target='_blank'>{wine.wineInfo.title}</a> · {wine.wineInfo.vivinoRating} ★</span>
    <div class='wine-card-text-params'>
      <div class="kv-item">{wine.wineInfo.color}</div>
      <div class="kv-item">{wine.wineInfo.region}</div>
      <div class="kv-item">Виноград: {wine.wineInfo.grape}</div>
      <div class="kv-item">Выпуск: <a href='{wine.wineInfo.releaseUrl}'>{wine.wineInfo.releaseTitle}</a></div>

    </div>
  </div>
</div>


<style type="text/less">
  .wine-card {
    width: calc(100% - 20px);
    padding: 10px;

    background-color: var(--backgroundColor);
    border-bottom: 1px solid var(--border-light-color);

    &:hover {
      background-color: var(--hover-background-color);
      cursor: pointer;
    }
  }
</style>
