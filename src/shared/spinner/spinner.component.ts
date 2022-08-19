/**
 * Usage:
 * [isShowing] Whether or not to show the spinner
 *
 * Example:
 * <app-spinner [isShowing]="someValue"></app-spinner>
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-spinner',
    }
})
export class SpinnerComponent {

    @Input()
    isShowing: boolean | null = false;

    @Input()
    size?: 'extra-small'|'small'|'medium'|'large'|'extra-large';

    @HostBinding('class.app-spinner--extra-small')
    get extraSmallClass(): boolean {
        return this.size === 'extra-small';
    }

    @HostBinding('class.app-spinner--small')
    get smallClass(): boolean {
        return this.size === 'small';
    }

    @HostBinding('class.app-spinner--large')
    get largeClass(): boolean {
        return this.size === 'large';
    }

    @HostBinding('class.app-spinner--extra-large')
    get extraLargeClass(): boolean {
        return this.size === 'extra-large';
    }
}
