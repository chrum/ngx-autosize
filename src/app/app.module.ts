import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
// import {AutosizeModule} from '../../projects/autosize/src/lib/autosize.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutosizeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
