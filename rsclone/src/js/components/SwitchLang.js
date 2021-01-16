// import {Storage} from "../core/services/Storage.js";
// import {Extra} from "../core/services/Extra.js";

export class SwitchLang {
  constructor(lang) {
    this.language = lang;
    this.setSwitchBtn();
    // this.setChangeLangEvent();
  }

  setSwitchBtn() {
    const checkbox = document.querySelector('.switch__checkbox');
    const switchEn = document.querySelector('.switch__en');
    const switchRu = document.querySelector('.switch__ru');

    if (this.language === 'ru' && checkbox.checked === false) {
      checkbox.checked = true;
      switchRu.classList.toggle('none');
      switchEn.classList.toggle('none');
    }
  }

  // setChangeLangEvent() {
  //     const switchGameModeBtn = document.querySelector('.switch__checkbox');
  //
  //     switchGameModeBtn.addEventListener('change', () => {
  //         const switchEn = document.querySelector('.switch__en');
  //         const switchRu = document.querySelector('.switch__ru');
  //         switchRu.classList.toggle('none');
  //         switchEn.classList.toggle('none');
  //         this.language = this.language === 'en' ? 'ru' : 'en';
  //         Storage.setLanguage(this.language);
  //
  //         // this.startMenu.renderByLang(this.language);
  //         Extra.translate(this.language);
  //     });
  // }
}
