import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
// import {AutosizeModule} from '../../projects/autosize/src/lib/autosize.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutosizeModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
