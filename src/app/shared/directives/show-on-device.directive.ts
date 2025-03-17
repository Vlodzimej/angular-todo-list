import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appShowOnDevice]',
})
export class ShowOnDeviceDirective implements OnInit, OnDestroy {
  @Input() minWidth: number | null = null; 
  @Input() maxWidth: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }

  private checkScreenWidth() {
    const screenWidth = window.innerWidth;

    const isVisible =
      (this.minWidth === null || screenWidth >= this.minWidth) &&
      (this.maxWidth === null || screenWidth <= this.maxWidth);

    if (isVisible) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}