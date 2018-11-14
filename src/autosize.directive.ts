import {ElementRef, HostListener, Directive, Input, AfterContentChecked} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;
@Directive({
    selector: '[autosize]'
})

export class AutosizeDirective implements AfterContentChecked {
    @Input() minRows: number;
    @Input() maxRows: number;

    private retries = 0;
    private textAreaEl: any;
    private oldContent: string;

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    constructor(public element: ElementRef) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();

        } else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style.overflow = 'hidden';
        }
    }
    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');

        if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
            this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
        }

        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('ngx-autosize: textarea not found');

            } else {
                this.retries++;
                setTimeout(() => {
                    this._findNestedTextArea();
                }, 100);
            }
            return;
        }
        this.textAreaEl.style.overflow = 'hidden';
    }
    ngAfterContentChecked(): void {
        this.adjust();
    }
    adjust(): void {
        if (this.textAreaEl) {
            if (this.textAreaEl.value === this.oldContent) {
              return;
            }
            this.oldContent = this.textAreaEl.value;
            
            const clone = this.textAreaEl.cloneNode(true);
            const parent = this.textAreaEl.parentNode;
            clone.style.visibility = 'hidden';
            parent.appendChild(clone);

            clone.style.overflow = 'auto';
            clone.style.height = 'auto';

            const lineHeight = this._getLineHeight();
            let height = clone.scrollHeight;
            const rowsCount = height / lineHeight;
            if (this.minRows && this.minRows >= rowsCount) {
                // clone.style.overflow = 'auto';
                height = this.minRows * lineHeight;

            } else if (this.maxRows && this.maxRows <= rowsCount) {
                // clone.style.overflow = 'auto';
                height = this.maxRows * lineHeight;
                this.textAreaEl.style.overflow = 'auto';

            } else {
                this.textAreaEl.style.overflow = 'hidden';
            }

            this.textAreaEl.style.height = height + 'px';
            parent.removeChild(clone);
        }
    }

    private _getLineHeight() {
        let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && window.getComputedStyle) {
            const styles = window.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }

        if (isNaN(lineHeight)) {
            const fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.2);
        }

        return lineHeight;
    }
}
