import {NgModule, ModuleWithProviders} from '@angular/core';
import {AutosizeDirective} from './src/autosize.directive';
export * from './src/autosize.directive';

@NgModule({
    declarations: [
        AutosizeDirective
    ],
    exports: [
        AutosizeDirective
    ]
})
export class AutosizeModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: AutosizeModule, providers: []};
    }
}
