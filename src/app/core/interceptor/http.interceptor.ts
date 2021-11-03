import {
  AuthService
} from '../services/auth.service';
import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  finalize,
  tap
} from "rxjs/operators";
@Injectable()
export class HttpInterceptorApp implements HttpInterceptor {
  private loadCount: number = 0;
  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest < unknown > , next: HttpHandler): Observable < HttpEvent < unknown >> {
    // if (this.authService.isLoggedIn()) {
    //   // request = request.clone({
    //   //   setHeaders: {
    //   //     'X-Authentication-Token': `${this.authService.getSessionData()}`
    //   //   }
    //   // });
    // }
    this.loadCount ++;
    return next.handle(request).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        if (!this.authService.isLoggedIn() && request.url.includes('login.json')) {
          this.setSession(evt.body);
        };
        this.httpStatusHandler(evt);
      }
    }, (error: HttpErrorResponse) => {
      this.handleError(error)
    })).pipe(finalize(() => {
      this.loadCount--;
      if (this.loadCount <= 0) {
        // setTimeout((x: any) => {
        //   this.loader.hide();
        // },100)
      }
    }));
  }

  /**
   * @description
   * Error handler function from 'catchError()'
   * @private - This Method Is  Private
   * @param {HttpErrorResponse} err
   * @memberof RiskvryInterceptor
   */
  private handleError(err: HttpErrorResponse) {
    this.httpStatusHandler(err)
    const error = err.error.message || err.statusText;
  }


  /**
   * @description
   * this method is calling after success api call
   * checking the status here and performing condtions based on that
   *
   * @private - This Method Is  Private
   * @param {*} [response]
   * @returns HttpResponse returns
   * @memberof RiskvryInterceptor
   */
  httpStatusHandler(response ? : any) {
    switch (response.status) {
      case 200:
        console.log("will do later");
        break;
      default:
        console.log("nothing to do");
        break;
    }
    return response;
  }

  /**
   * @description
   * Setting the access tokens after sign in or sign up
   * @private
   * @param {*} [body]
   * @memberof HttpInterceptorService
   */
  private setSession(body ? : any) {
    /* Setting the jwt token to the header if the local storage has the Bearer token */
    /* For the Config API doesn't need any header, so we checking weather the req has the Config API endpoint or not*/
    // this.loadCount ++;
    // this.authService.setSessionData(JSON.stringify(body))
  }


}
