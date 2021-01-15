class Playground {
  constructor(options) {
    this.container = options.container || document.querySelector('.container__playground');
    this.lang = options.lang || 'en';
    this.allCategoriesEn = options.allCategoriesEn || [];
    this.allCategoriesRu = options.allCategoriesRu || [];
    this.render();
    this.showCategories(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
  }

  render() {
    this.playground = document.createElement('div');
    this.playground.classList = 'playground';
    this.container.append(this.playground);

    this.createTable(this.lang === 'en' ? this.allCategoriesEn : this.allCategoriesRu);
    this.createButton();
    this.createScoreboard();
    this.createRound();
  }

  createTable(arr) {
    this.table = document.createElement('table');
    this.table.classList = 'playground__table';
    let i = 0;
    // eslint-disable-next-line operator-linebreak
    const str =
      "<td class='cell cell-1'>100</td><td class='cell cell-2'>200</td><td class='cell cell-3'>300</td><td class='cell cell-4'>400</td><td class='cell cell-5'>500</td>";
    this.table.innerHTML = `
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    <tr class='row-${++i}'>
    <th class='cell-0'>${arr[i - 1]}</th>${str}</tr>
    `;
    this.playground.append(this.table);

    this.bindTableEvent();
  }

  bindTableEvent() {
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        e.target.classList.add('blink');
        setTimeout(() => {
          e.target.classList.remove('blink');
          e.target.textContent = '';
        }, 2500);
        setTimeout(() => {
          this.showQuestion();
        }, 3000);

        setTimeout(() => {
          this.showTable();
          this.showButton();
          this.hideScoreboard();
        }, 21000);
      }
    });
  }

  showCategories(arr = this.allCategoriesEn, delay = 5) {
    if (this.answerButton && this.table) {
      this.hideTable();
      this.hideButton();
    }

    this.categoriesList = document.createElement('ul');
    this.categoriesList.classList = 'playground__categories-list';
    arr.forEach((el) => {
      const item = document.createElement('li');
      item.classList = 'playground__categories-item';
      item.textContent = el;
      this.categoriesList.append(item);
    });
    this.playground.append(this.categoriesList);

    setTimeout(() => {
      this.categoriesList.classList.add('playground__categories-list_animated');
    }, 0);
    setTimeout(() => {
      this.showRound(1);
    }, delay * 1000);
    setTimeout(() => {
      this.categoriesList.classList.add('none');
      this.showTable();
      this.showButton();
      this.hideScoreboard();
    }, (delay + 3) * 1000);
  }

  createScoreboard() {
    this.scoreboard = document.createElement('div');
    this.scoreboard.classList = 'playground__scoreboard none';

    this.question = document.createElement('p');
    this.question.classList = 'playground__question';
    this.scoreboard.append(this.question);

    this.answerInput = document.createElement('input');
    this.answerInput.classList = 'playground__answer-input';
    this.answerInput.setAttribute('type', 'text');
    this.scoreboard.append(this.answerInput);

    this.answerRadio = document.createElement('div');
    this.answerRadio.classList = 'playground__answer-radio none';
    this.answerRadio.innerHTML = `
    <label class="playground__answer-radio-buttons">
      <input type="radio" name="answer" checked>Option 1
    </label>
    <label class="playground__answer-radio-buttons">
      <input type="radio" name="answer">Option 2
    </label>
    <label class="playground__answer-radio-buttons">
      <input type="radio" name="answer">Option 3
    </label>
    <label class="playground__answer-radio-buttons">
      <input type="radio" name="answer">Option 4
    </label>
    `;
    this.scoreboard.append(this.answerRadio);

    this.playground.append(this.scoreboard);
  }

  showScoreboard() {
    this.showButton();
    this.scoreboard.classList.remove('none');
  }

  hideScoreboard() {
    this.scoreboard.classList.add('none');
  }

  showQuestion(question = 'question question question question???', type = 'input') {
    if (this.table) {
      this.hideTable();
    }
    if (this.categoriesList) {
      this.hideCategories();
    }
    this.showScoreboard();
    this.question.textContent = `${question}`;
    if (type === 'input') {
      this.answerInput.classList.remove('none');
      this.answerRadio.classList.add('none');
      this.answerInput.value = '';
    } else if (type === 'checkbox') {
      this.answerRadio.classList.remove('none');
      this.answerInput.classList.add('none');
    }
    // setTimeout(() => {}, 0);
  }

  createRound() {
    this.round = document.createElement('h2');
    this.round.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} 1`;
    this.round.classList = 'playground__round none';
    this.playground.append(this.round);
  }

  showRound(count = 1) {
    if (this.table && this.answerButton) {
      this.hideTable();
      this.hideButton();
      this.hideScoreboard();
    }
    if (this.categoriesList) {
      this.hideCategories();
    }
    this.round.classList.remove('none');
    this.round.textContent = `${this.lang === 'en' ? 'Round' : 'Раунд'} ${count}`;

    setTimeout(() => {
      this.round.classList.add('none');
      this.showTable();
      this.showButton();
    }, 1000);
  }

  hideCategories() {
    this.categoriesList.classList.add('none');
  }

  hideTable() {
    this.table.classList.add('none');
  }

  showTable() {
    this.table.classList.remove('none');
  }

  createButton() {
    this.answerButton = document.createElement('button');
    this.answerButton.textContent = 'Кнопочка';
    this.answerButton.classList.add('controls__answer-button');
    this.container.append(this.answerButton);
  }

  hideButton() {
    this.answerButton.classList.add('none');
  }

  showButton() {
    this.answerButton.classList.remove('none');
  }

  clear() {
    this.playground.innerHTML = '';
  }
}

export default Playground;
