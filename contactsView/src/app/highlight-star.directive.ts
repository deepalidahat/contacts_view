import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightStar]'
})
export class HighlightStarDirective implements OnChanges{
  @Input() appHighlightStar: boolean = false;
  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.appHighlightStar ? 'gold' : 'gray';
  }
}
