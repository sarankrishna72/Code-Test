import { getLocalStorageData, setLocalStorageData } from './../../../../core/essentials/common.libs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkLocalStorage } from 'src/app/core/essentials/common.libs';
import { PopupModel } from 'src/app/core/models';
import * as moment from 'moment';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.scss']
})
export class CreateUserPopupComponent {
  @Input('popup') popup: PopupModel = new PopupModel();
  @Output('close') close = new EventEmitter();
  form: FormGroup = new FormGroup({});
  nameTitle: any = [
    {
      id: 'Mr',
      name: "Mr"
    },
    {
      id: 'Mrs',
      name: "Mrs"
    },
    {
      id: 'Mis',
      name: "Mis"
    }
  ]
  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) {
    this.form = fb.group({
      "name": fb.group({
        "title":  new FormControl('Mr', [Validators.required]),
        "first":  new FormControl('', [Validators.required]),
        "last":  new FormControl('', [Validators.required])

      }),
      "gender": new FormControl('Male', [Validators.required]),
      "email": new FormControl('',  [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      "username": new FormControl('', [Validators.required]),
      "password": new FormControl('', [Validators.required]),
      "dob": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required]),
    })
  }

  /* submit the form */
  onSubmit() {
    let list: any[] = getLocalStorageData('usersList')
    let obj: any = {
      "profile_pic": `<img src="assets/images/profile.png" class="d70">`,
      "name": `${this.form.value.name?.title} ${this.form.value?.name?.first} ${this.form.value?.name?.last}`,
      "email": `${this.form.value?.email}`,
      "gender": `${this.form.value?.gender}`,
      "dob": `${ moment(this.form.value?.dob).format("MMM/DD/YYYY")}`,
      "phone": `${this.form.value?.phone}`,
      "location": `Unknown`
  }
    if (list) {
      list.push(obj)
    } else {
      list = [obj]
    }
    setLocalStorageData('usersList',list)
    this.appService.toggleToast({
      type: 'success',
      load: true,
      position: 'top-right',
      context: { description: 'User Created Successfully' }
    });
    this.closePopup();
  }

  /**
   * @description
   * This Method Is For Getting The each form Controls of formGroup to Check The Validation
   * @param {string} [controlName]
   * @returns the specfic FormControl Based on the Param
   * @memberof CreateUserPopupComponent
  */
  f(controlName?: string) {
    return this.form.get(controlName || '')
  }

  /**
  * @description
  * Click on close button this method will call
  *
  * @memberof CreateUserPopupComponent
  */
  closePopup() {
    this.close.emit('icon');
  }

}
