import { PlatFormDetetorService } from './../../core/plataform-detector/platform-detector.service';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[immediateClick]',
})
export class immediateClickDirective implements OnInit {
  constructor(
    private element: ElementRef<any>,
    private platFormDetetorService: PlatFormDetetorService
  ) {}
  ngOnInit(): void {
    this.platFormDetetorService.isPlatformBrowser() &&
      this.element.nativeElement.click();
  }
}
