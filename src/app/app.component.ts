import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

const longText = `Mega Man X, known in Japan as Rockman X,[a] is an action-platform video game developed and published by Capcom for the Super Nintendo Entertainment System (SNES).
        1
        2
        3`;
const resetExplanation = `In this text area we want to test if text after some manual changes can be restored to its original value and if textarea keeps autosizing...


so just change this text, add some lines...
and in the end hit the 'RESET' button above.

Text area should come back to its original form :)
`;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public longText = longText;
    public resetableContent = resetExplanation;
    public minRows = 1;
    public maxRows = 4;
    public onlyGrow = true;
    public useImportant = true;
    public dynamic: 'enabled' | 'disabled' = 'enabled';

    public showAreaInContainer = true;

    public todo = [
        'Get to work',
        'Go home',
    ];

    public done = [
        'Get up',
    ];

    reactiveText = new FormControl(longText);
    reactiveForm = new FormGroup({
        reactiveText: new FormControl(longText)
    });

    ngOnInit(): void {
        setTimeout(() => { this.showAreaInContainer = false;});
    }

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

    resetArbitraryExample() {
        this.resetableContent = resetExplanation;
    }

    onResized(newHeight) {
        console.log(newHeight);
    }



    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
