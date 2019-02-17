import {
    ElementRef,
    HostListener,
    Directive,
    Input,
    NgZone, OnDestroy, OnChanges, AfterContentChecked
} from '@angular/core';
import {fromEvent, ReplaySubject} from 'rxjs';

import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

const MAX_LOOKUP_RETRIES = 3;

@Directive({
    selector: '[autosize]'
})

export class AutosizeDirective implements OnDestroy, OnChanges, AfterContentChecked {
    @Input() minRows: number;
    @Input() maxRows: number;
    @Input() onlyGrow = false;
    @Input() useImportant = false;

    private retries = 0;
    private textAreaEl: any;

    private _oldContent: string;
    private _oldWidth: number;

    private _destroyed$ = new ReplaySubject(1);

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(
        public element: ElementRef,
        private _zone: NgZone
    ) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();

        } else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style.overflow = 'hidden';
            this._onTextAreaFound();
        }
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    ngAfterContentChecked() {
        this.adjust();
    }

    ngOnChanges(changes) {
        this.adjust(true);
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
        this._onTextAreaFound();

    }

    _onTextAreaFound() {
        this._zone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(
                    takeUntil(this._destroyed$),
                    debounceTime(200),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                        this._zone.run(() => {
                            this.adjust();
                        });
                    }
                );
        });
        setTimeout(() => {
            this.adjust();
        });
    }

    adjust(inputsChanged = false): void {
        if (this.textAreaEl) {

            const currentText = this.textAreaEl.value;

            if (
                inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth
            ) {
                return;
            }

            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;

            const clone = this.textAreaEl.cloneNode(true);
            const parent = this.textAreaEl.parentNode;
            clone.style.visibility = 'hidden';
            parent.appendChild(clone);

            clone.style.overflow = 'auto';
            clone.style.height = 'auto';

            let height = clone.scrollHeight;
            const willGrow = height > this.textAreaEl.offsetHeight;

            if (this.onlyGrow === false || willGrow) {
                const lineHeight = this._getLineHeight();
                const rowsCount = height / lineHeight;

                let styleAttribute = '';

                if (this.minRows && this.minRows >= rowsCount) {
                    height = this.minRows * lineHeight;

                } else if (this.maxRows && this.maxRows <= rowsCount) {
                    height = this.maxRows * lineHeight;
                    styleAttribute += 'overflow: auto;';

                } else {
                    styleAttribute += 'overflow: hidden;';
                }

                styleAttribute += `height: ${height}px`;

                styleAttribute += this.useImportant ? '!important;' : ';';

                this.textAreaEl.setAttribute('style', styleAttribute);
            }

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
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }

        return lineHeight;
    }
}
