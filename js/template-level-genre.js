// Модуль для создания части шаблона, отвечающей за отрисовку уровня игры на выбор жанра

const createGenreLevelTemplate = (level) => `\
<div class="main-wrap">
  <h2 class="title">Выберите ${level.genre} треки</h2>
  <form class="genre">

    ${level.answers.map((item, index) =>
    `<div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio>
            <source src="${item.src}">
          </audio>
          <button class="player-control player-control--play" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-${index + 1}" id="a-${index + 1}">
      <label class="genre-answer-check" for="a-${index + 1}"></label>
    </div>`).join(``)}

    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
</div>
`;

export default createGenreLevelTemplate;
