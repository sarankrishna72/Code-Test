import { AppStoreService } from './app.store.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { config } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PopupModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  toastTimer: any;
  constructor(
    private appStoreService: AppStoreService,
    public http: HttpClient,
  ) { }

  /**
   * @description
   * Sign IN Api
   * @param data
   * @returns
   */
  signIn() {
    return this.http.get(`./assets/api/login.json`)
    .pipe(map(response => this.appStoreService.apiResp = response));
  }



  /**
   * @description
   * get User list from Api
   * @param data
   * @returns all user list
   */
   getUserList(data: any) {
    return this.http.get(`${config.baseApiURL}${config.apiURI}${config.versionURI}`, {params: data})
    .pipe(map(response => this.appStoreService.apiResp = response));
  }



  /* Function to Trigger the Toast */
  public toggleToast(toast?: any) {
    clearTimeout(this.toastTimer);
    this.appStoreService.toast.type = (toast.type != null) ? toast.type.split(' ').join('') : this.appStoreService.toast.type.split(' ').join('');
    this.appStoreService.toast.context = (toast.context != null) ? toast.context : this.appStoreService.toast.context;
    this.appStoreService.toast.load = (toast.load != null) ? toast.load : this.appStoreService.toast.load;
    this.appStoreService.toast.position = (toast.type != null) ? toast.position : 'top-right';

    this.toastTimer = setTimeout(() => {
      if (this.appStoreService.toast.load) { this.appStoreService.toast.load = false; }
    }, this.appStoreService.toast.pause * 1000);
  }

    /**
   * @description
   * Function to trigger the Popup
   *
   * @param {PopupModel} popup
   * @memberof AppService
   */
     public togglePopup(popup: PopupModel){
      this.appStoreService.popup.type = (((typeof popup.type !== 'undefined'))?popup.type:this.appStoreService.popup.type);
      this.appStoreService.popup.context = ((typeof popup.context !== 'undefined')?popup.context:this.appStoreService.popup.context);
      this.appStoreService.popup.load = ((typeof popup.load !== 'undefined')?popup.load:this.appStoreService.popup.load);
      this.appStoreService.popup.refreshParent = popup.refreshParent ? popup.refreshParent : false;
      this.appStoreService.popup.overlayClose = ((typeof popup.overlayClose !== 'undefined')?popup.overlayClose:this.appStoreService.popup.overlayClose);
      let element = document.getElementById('popupContainer') as HTMLElement;
      setTimeout(() => {
        if (element) {
          element.classList.add('active');
        }
        document.body.classList.add('overflowHidden');
        
      }, 100);
    }



}
