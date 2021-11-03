import { PopupComponent } from './components/popup/popup.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* Translate Module */
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function TranslatorFactory(httpClient: HttpClient) { return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json'); }

/* Pipes */
import { SearchPipe } from './pipes';
import { DebounceDirective } from '../core/directives/debounce.directive';


/* components */
import { HeaderComponent } from './components/header/header.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { SearchComponent } from './components/search/search.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { CreateUserPopupComponent } from './components/popup/create-user-popup/create-user-popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchPipe,
    DatatableComponent,
    ToasterComponent,
    DebounceDirective,
    SearchComponent,
    EmptyStateComponent,
    CreateUserPopupComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslatorFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    TranslateModule,
    SearchPipe,
    DatatableComponent,
    FormsModule,
    ReactiveFormsModule,
    DebounceDirective,
    ToasterComponent,
    SearchComponent,
    EmptyStateComponent,
    PopupComponent
  ],
  providers: [
    SearchPipe,
  ]
})
export class SharedModule {
  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang('en'); /* Setting up the Translate Json to English - `en` */
  }
}
