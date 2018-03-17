import { JhiHttpInterceptor } from 'ng-jhipster';
import { Injector } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../shared/login/login.service';
import { StateStorageService } from '../../shared/auth/state-storage.service';

export class AuthExpiredInterceptor extends JhiHttpInterceptor {

    constructor(private injector: Injector,
        private stateStorageService: StateStorageService) {
        super();
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return <Observable<Response>> observable.catch((error) => {
            console.log('///////////////////////// AuthExpiredInterceptor  ///////////////////////////')
            if (error.status === 401 && error.text() !== ''
                // && error.json().path && !error.json().path.includes('/api/account')
                ) {
                console.log('/////////////////////////  401 ///////////////////////////')
                const destination = this.stateStorageService.getDestinationState();
                if (destination !== null) {
                    const to = destination.destination;
                    const toParams = destination.params;
                    if (to.name === 'accessdenied') {
                        this.stateStorageService.storePreviousState(to.name, toParams);
                    }
                } else {
                    this.stateStorageService.storeUrl('/');
                }
                const loginService: LoginService = this.injector.get(LoginService);
                loginService.login()
                //loginService.logoutObs().subscribe(
                //    ok => loginService.login()
                //);
            }
            return Observable.throw(error);
        });
    }
}
