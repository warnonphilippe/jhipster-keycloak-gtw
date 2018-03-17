import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-session.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {

    constructor(
        private principal: Principal,
        private authServerProvider: AuthServerProvider
    ) {}

    login() {
        let port = (location.port ? ':' + location.port : '');
        if (port === ':9000') {
            port = ':8080';
        }

        let tenant = location.hostname.split('.', 1).shift()
        if (tenant === 'localhost'){
            tenant = 'jhipster'
        }

        let to = '//' + location.hostname + port + '/login?realm=' + tenant.trim()
        location.href = to
        // location.href = '//' + location.hostname + port + '/login?realm=jhipster'
        //location.href = '//' + location.hostname + port + '/login?realm=' + tenant

    }

    login2() {
        let port = (location.port ? ':' + location.port : '');
        if (port === ':9000') {
            port = ':8080';
        }
        location.href = '//' + location.hostname + port + '/login'; //?realm=jhipster2
    }

    logout() {
        this.authServerProvider.logout().subscribe()
        this.principal.authenticate(null)
    }

    logoutObs() : Observable<boolean>{
        return new Observable (obs => {
            this.authServerProvider.logout()
            this.principal.authenticate(null)
            obs.next(true)
            obs.complete()
        })
    }
}
