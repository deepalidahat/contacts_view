import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightStar]'
})
export class HighlightStarDirective {

  @Input() appHighlightStar: boolean = false;
   constructor(private el: ElementRef) { }
 
   ngOnChanges() {
     this.el.nativeElement.style.color = this.appHighlightStar ? 'gold' : 'gray';
   }

}
