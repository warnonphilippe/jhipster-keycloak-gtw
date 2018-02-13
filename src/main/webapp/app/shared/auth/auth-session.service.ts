import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class AuthServerProvider {

    constructor(
        private http: Http
    ) {}

    logout(): Observable<any> {
        // logout from the server
        // ne delog pas du keycloak, https://github.com/jhipster/generator-jhipster/issues/6555
        return this.http.post(SERVER_API_URL + 'api/logout', {})
            /*
            .map((response: Response) => {
            // to get a new csrf token call the api

            this.http.get(SERVER_API_URL + 'api/account')
                .subscribe(() => {
                    console.log('api/account OK')
                }, () => {
                    console.log('api/account ERROR')
                });
            return response;

            })*/
    }
}
