import { checkLocalStorage, getLocalStorageData } from './../../../../core/essentials/common.libs';
import { AppStoreService } from './../../../../core/services/app.store.service';
import { AppService } from './../../../../core/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchValue: string = '';
  paginationCount: number = 20;
  constructor(
    private appService: AppService,
    public appStoreService: AppStoreService
  ) { 
   
  }

  /**
   * @description
   * method for getting Usr list
   * @returns
   * user list array
   */
  getUserList() {
    if (checkLocalStorage('usersList')) {
      this.appStoreService.setUserTableData(getLocalStorageData('usersList'))
      return false;
    } 
    this.appService.getUserList({results: this.paginationCount}).subscribe(response => {
      this.appStoreService.setUserListPage();
    })
  }


  /**
   * @description
   * method for open  add user popup
   */
  addUserPopup() {
    this.appService.togglePopup({
      type: 'createUser',
      load: true,
      refreshParent: true,
      overlayClose: true,
      context: {}
    });
  }

  ngOnInit(): void {
    this.getUserList();
  }

}
