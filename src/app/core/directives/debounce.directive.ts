import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective {
  @Input('debounceTime') debounceTime: number = 500;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription = new Subscription();

  constructor() {
  }

  ngOnInit() {
    this.subscription.add(
      this.clicks.pipe(
        debounceTime(this.debounceTime)
      ).subscribe(e => this.debounceClick.emit(e))
    );
  }

  ngOnDestroy() {
    if (this.subscription)
    this.subscription.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  clickEvent(event ?: any) {

    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

}
