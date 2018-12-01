[![npm version](https://badge.fury.io/js/ngx-autosize.svg)](https://badge.fury.io/js/ngx-autosize)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-autosize/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-autosize)
# ngx-autosize

***ngx-autosize*** is an Angular2+ directive that automatically adjusts textarea height to fit its content.

It adjusts the textarea height automatically to any text input, or changes to the model bound to the textarea.
- Production builds ready (AOT support)
- Works with [Ionic](http://ionicframework.com/) (shadow dom of v4 too)

Check the demo [here](https://chrum.it/pages/ngx-autosize)

## Installation:

```bash
npm install ngx-autosize
```

## Use Example:

Add the declaration to your @NgModule:

```typescript
import {AutosizeModule} from 'ngx-autosize';

...

@NgModule({
  imports: [
    AutosizeModule
  ]
})
```

Use directly inside your HTML templates

```
<textarea autosize class="my-textarea">
    Hello, this is an example of Autosize in Angular2.
</textarea>
```
```
<ion-textarea autosize [(ngModel)]="text">
    And this is Ionic2 example
</ion-textarea>
```

#### Reactive forms
In order to use our sweet directive with FormGroup we need to feed our directive with it:
```
<form [formGroup]="reactiveForm">
    <textarea type="text" formControlName="reactiveText" autosize
        [formGroup]="reactiveForm"></textarea>
</form>
```

## Settings
##### [minRows] 
Sets minimal amount of rows of the textarea
##### [maxRows]
Sets maximum rows count after which autosizing if turned off and scrollbar appears
```
<textarea autosize [minRows]="5" [maxRows]="10">
    Hello, this is an example of Autosize in Angular2.
</textarea>
```

## Origins
This small lib is based on great
[http://stevepapa.com/angular2-autosize](http://stevepapa.com/angular2-autosize)
which is unfortunatelly not maintained and abandoned :(

## Authors

[Steve Papa](https://stevepapa.com)
[Chrystian Ruminowicz](http://chrum.it)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
