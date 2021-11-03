import { Component, ViewEncapsulation } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import { AppStoreService } from './../../../core/services/app.store.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [
    trigger('fadeIn', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(100, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(100, style({ opacity: 0 }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ToasterComponent{

  constructor(
    public appStoreService: AppStoreService
  ) { }

}
