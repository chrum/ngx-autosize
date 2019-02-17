import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

const longText = `Mega Man X, known in Japan as Rockman X,[a] is an action-platform video game developed and published by Capcom for the Super Nintendo Entertainment System (SNES).
        1
        2
        3`;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public longText = longText;
    public minRows = 3;
    public maxRows = 4;
    public onlyGrow = true;
    public useImportant = true;

    reactiveText = new FormControl(longText);
    reactiveForm = new FormGroup({
        reactiveText: new FormControl(longText)
    });

    changeNgModel() {
        this.longText += "\n next";
    }

    updateReactiveText() {
        const current = this.reactiveText.value;
        this.reactiveText.setValue(current + "\n next");
    }

    updateReactiveFormText() {
        const current = this.reactiveForm.value.reactiveText;
        this.reactiveForm.setValue({
            reactiveText: current + "\n next"
        });
    }
}
