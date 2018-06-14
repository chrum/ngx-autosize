# ngx-autosize

***ngx-autosize*** is an Angular2+ directive that automatically adjusts textarea height to fit its content.

It adjusts the textarea height automatically to any text input, or changes to the model bound to the textarea.

## Origins
This small lib is based on great
[http://stevepapa.com/angular2-autosize](http://stevepapa.com/angular2-autosize)
which is unfortunatelly not maintained and abandoned :(. On top of some small tweaks ***this lib adds***
- AOT support
- nested textarea lookup so it is possible to use it with [Ionics](http://ionicframework.com/) <ion-textarea>

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

## Authors

[Steve Papa](https://stevepapa.com)
[Chrystian Ruminowicz](http://chrum.it)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
