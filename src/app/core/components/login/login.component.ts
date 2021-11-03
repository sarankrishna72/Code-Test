import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from './../../services/app.service';
import { AppStoreService } from './../../services/app.store.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { encryptBase64 } from '../../essentials/common.libs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  form: FormGroup = new FormGroup({})
  constructor(
    private formBuilder: FormBuilder,
    private appStoreService: AppStoreService,
    private appService: AppService,
    private router: Router,
    private authService: AuthService

  ) {
    this.form = formBuilder.group({
      "email": new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      "password": new FormControl('', [Validators.required]),
    });
  }

  /** 
   * @description
   * This Method Is For Getting The each form Controls of formGroup to Check The Validation
   * @param {string} [controlName]
   * @returns the specfic FormControl Based on the Param
   * @memberof LoginComponent
  */
  f(controlName?: string) {
    return this.form.get(controlName || '')
  }

  /** 
   * @description
   * This Method Is For Submitting the form for login validation
   * 
   * @returns the corresponding users token
   * @memberof LoginComponent
  */
  onSubmit() {
    this.appService.signIn().subscribe((response: JSON) => {
      if (encryptBase64(JSON.stringify(this.form.value)) == encryptBase64(JSON.stringify(response))) {
        this.toastMsg('success', 'Signed in successfully')
        this.authService.setSessionData(encryptBase64(JSON.stringify(response)))
        this.router.navigate(['/user/list'])
      } else {
        this.toastMsg('error', 'Sign in failed, Please enter a valid credentails ')
      }
    })
  }

  private toastMsg(type: string, description: string) {
    this.appService.toggleToast({
      type: type,
      load: true,
      position: 'top-right',
      context: { description: description }
    });
  }

}
