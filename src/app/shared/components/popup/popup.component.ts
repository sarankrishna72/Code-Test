import { AppStoreService } from './../../../core/services/app.store.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() public refreshPage = new EventEmitter();
  constructor(
    public appStoreService: AppStoreService,
    public appService: AppService,
  ) { }


  /**
   * @description
   * Close Popup Parent Method
   *
   * @param {string} [close_type]
   * @memberof PopupComponent
   */
  public closePopup(close_type ?: string){
    if(this.appStoreService.popup.refreshParent){
      this.refreshPage.emit(close_type);
    }
    switch (close_type) {
      case 'overlay':
        if(this.appStoreService.popup.overlayClose){
          this.appStoreService.popup.load = false;
        }
        break;
      default:
        this.appStoreService.popup.load = false;
        break;
    }
    document.body.classList.remove('overflowHidden');
    
  }

  /**
   * @description
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   * Add 'implements OnInit' to the class.
   *
   * @memberof PopupComponent
   */
  ngOnInit(): void {
    
  }

}
