import {ElementRef, HostListener, Directive, Input} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;
@Directive({
    selector: '[autosize]'
})

export class Autosize {
    @Input() minRows: number;
    @Input() maxRows: number;

    @HostListener('input',['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    private retries: number = 0;
    private textAreaEl: any;
    constructor(public element: ElementRef) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();

        } else {
            this.textAreaEl = this.element.nativeElement;
        }
    }
    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.getElementsByTagName('TEXTAREA')[0];
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('angular2-autosize: textarea not found');

            } else {
                this.retries++;
                setTimeout(() => {
                    this._findNestedTextArea();
                }, 100);
            }
        }
    }
    ngAfterContentChecked(): void{
        this.adjust();
    }
    adjust(): void {
        if (this.textAreaEl) {
            let area = this.textAreaEl;
            area.style.overflow = 'hidden';
            area.style.height = 'auto';

            let lineHeight = this._getLineHeight();
            let height = area.scrollHeight;
            let rowsCount = height / lineHeight;
            if (this.minRows && this.minRows >= rowsCount) {
                area.style.overflow = 'auto';
                height = this.minRows * lineHeight;

            } else if(this.maxRows && this.maxRows <= rowsCount) {
                area.style.overflow = 'auto';
                height = this.maxRows * lineHeight;
            }
            area.style.height = height + "px";
        }
    }

    private _getLineHeight() {
        let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight)) {
            let fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px','')) * 1.5);
        }

        return lineHeight;
    }
}
