import { setLocalStorageData } from './../essentials/common.libs';
import { UserListModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { observable, action } from "mobx-angular";
import { PopupModel, TableModel, ToastModel } from '../models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  @observable tableObj: TableModel = new TableModel();
  @observable apiResp: any;
  @observable toast: ToastModel = new ToastModel();
  @observable popup: PopupModel | any = new PopupModel();
  @observable userList: UserListModel[] = []
  constructor() { }

  /* action for set user list data */
  @action setUserListPage() {
    this.userList = this.apiResp.results;
    let body = [];
    for (const item of this.userList) {
      body.push({
        "profile_pic": `<img src="${item.user?.picture?.medium}"  class="d70">`,
        "name": `${item.user?.name?.title} ${item.user?.name?.first} ${item.user?.name?.last}`,
        "email": `${item.user?.email}`,
        "gender": `${item.user?.gender}`,
        "dob": `${ moment.unix(item.user?.dob).format("MMM/DD/YYYY")}`,
        "phone": `${item.user?.phone}`,
        "location": `${item.user?.location?.street}<br/>${item.user?.location?.city},${item.user?.location?.state}<br/>${item.user?.location?.zip}`
      })
    }
    setLocalStorageData('usersList', body);
    this.setUserTableData(body)
  }

   /* action for set user Table data */
  setUserTableData(body: any) {
    this.tableObj = {
      isPagination: false,
      head: [
        {
          title: 'Profile Pic',
          value: `profile_pic`,
          sortable: false,
          sortType: "asc",
          visible: true,
          shrink: false,
          html: true
        },{
          title: 'name',
          value:  `name`,
          sortable: true,
          html: false,
          visible: true,
          shrink: true
        },{
          title: 'Email',
          value: `email`,
          sortable: true,
          sortType: "asc",
          visible: true,
          shrink: true
        },{
          title: 'Gender',
          value: `gender`,
          sortable: false,
          sortType: "asc",
          visible: true,
          shrink: true
        },{
          title: 'DOB',
          value: 'dob',
          sortable: false,
          sortType: "asc",
          visible: true,
          shrink: true
        },{
          title: 'Location',
          value: 'location',
          sortable: false,
          sortType: "asc",
          html: true,
          visible: true,
          shrink: true
        },{
          title: 'Phone',
          value: 'phone',
          sortable: false,
          visible: true,
          shrink: true
        }
      ],
      body: []
    }
  
    this.tableObj['body'] = body;
  }

}
