import { Component, Input } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: './vmessage.com.html',
})
export class VmessageComponent {
  @Input() text = '';
}
