import {NgModule} from '@angular/core';
import {AutosizeDirective} from './autosize.directive';
import {WindowRef} from './window-ref.service';

@NgModule({
    declarations: [AutosizeDirective],
    imports: [],
    providers: [
        WindowRef
    ],
    exports: [AutosizeDirective]
})
export class AutosizeModule {
}
