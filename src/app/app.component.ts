import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {LangSerciveService} from './services/lang-sercive.service';
import Language from './models/language';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /* langs = [
    {
      name: 'Francais',
      code: 'fr',
      levelSpeak: 1,
      levelWrite: 3,
      levelComprehension: 1,
    },
    {
      name: 'Anglais',
      code: 'en',
      levelSpeak: 5,
      levelWrite: 3,
      levelComprehension: 2,
    },
    {
      name: 'Allemand',
      code: 'de',
      levelSpeak: 1,
      levelWrite: 3,
      levelComprehension: 2,
    }
  ]; */
  
  langs: Array<any> = new Array<Language>();

  activeCode = '';
  totalLevelsLangs = [1,2,3,4,5,6,7];
  availableLanguage = [];

  langForm: FormGroup;

  constructor(private translate: TranslateService, private langSerciveService: LangSerciveService,
    private formBuilder: FormBuilder) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}

  ngOnInit(): void {
    this.initForm();
    this.initAvailableLang();
    this.getLanguages();
  }

  // LIST OF LANGUAGE TO SHOW IN SELECT
  filterLanguages() {
    const tmpLangs = [];
    this.availableLanguage.forEach((lang) => {
      if (!this.langs.find((l) => l.code == lang.code)) {
        tmpLangs.push(lang);
      }
    });
    this.availableLanguage = tmpLangs;
  }

  initForm() {
    this.langForm = this.formBuilder.group({
      name: '',
      code: '',
      level_speak: '',
      level_write: '',
      level_comprehension: '',
    });
  }

  initAvailableLang() {
    this.availableLanguage = [{code: 'fr', name: 'Francais'},{ code: 'en', name: 'Anglais'}, { code: 'de', name: 'Allemand'}];
  }

  // GET LANG_NAME
  getLangName(langCode: any): string {
    return "LANG_NAME_" + langCode.toLocaleUpperCase();
  }

  open(content) {
    /* this.modalService.open(content); */
  }

  onSubmitForm() {
    const formValue = this.langForm.value;
    const name = this.availableLanguage.find(l => l.code == formValue['code']).name || '';
    const newLang = new Language(
      name,
      formValue['code'],
      formValue['level_speak'],
      formValue['level_write'],
      formValue['level_comprehension'],
    );

    this.langSerciveService.addLang(newLang).subscribe(response => {
      this.initForm();
      this.initAvailableLang();
      this.getLanguages();
      this.filterLanguages();
    });
  }

  // CHANGE THE ACTIVE LANG WHEN WE CLICK ON LANGUAGE
  changeLang (langCode) {
    this.activeCode = langCode;
    this.translate.use(langCode);
  }

  //----------------------- GET ALL
  getLanguages() {
    this.langSerciveService.getAllLanguages().then((languages: Array<any>) => {
      this.langs = languages;
      this.activeCode = this.langs[0].code;
      this.translate.use(this.activeCode);
      this.filterLanguages();
      console.log(languages)
    });
  }

  //----------------------- DELETE
  deleteLang(id) {
    this.langSerciveService.deleteLang(id).subscribe(response => {
      this.initForm();
      this.initAvailableLang();
      this.getLanguages()
      this.filterLanguages();
    });
  }
}
