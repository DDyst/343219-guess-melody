// Модуль для создания части шаблона, отвечающей за отрисовку уровня игры на выбор исполнителя

const createArtistLevelTemplate = (level) => `\
<div class="main-wrap">
  <h2 class="title main-title">Кто исполняет эту песню?</h2>
  <div class="player-wrapper">
    <div class="player">
      <audio>
        <source src="${level.audio}">
      </audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <form class="main-list">

    ${level.answers.map((item, index) =>
    `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}"/>
      <label class="main-answer" for="answer-${index + 1}">
        <img class="main-answer-preview" src="${item.image}"
             alt="${item.artist}" width="134" height="134" tabindex="0">
        ${item.artist}
      </label>
    </div>`).join(``)}

  </form>
</div>
`;

export default createArtistLevelTemplate;
