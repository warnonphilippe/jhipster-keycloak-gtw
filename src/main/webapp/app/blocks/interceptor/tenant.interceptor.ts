
import { JhiAlertService, JhiHttpInterceptor } from 'ng-jhipster';
import { RequestOptionsArgs, Response } from '@angular/http';
import {Injectable, Injector} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenantInterceptor extends JhiHttpInterceptor {

    constructor() {
        super()
        console.log("create TenantInterceptor")
    }

    //pas suffisant, pas appellé lors du login ni logout
    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        options.params = {}
        // TODO : comment setter le bon tenant ?
        options.params['realm'] = 'jhipster'
        //console.log(options.params)
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {

        return observable.map((response: Response) => {
            //console.log('responseIntercept***********************************')
            //console.log(response.url)
            //console.log(response.headers)
            response.headers.forEach((value, name) => {
                if (name.toLowerCase().endsWith('location')) {
                    //console.log('return location : ' + value)
                }
            });
            //console.log('responseIntercept***********************************')
            return response;
        }).catch((error) => {
            return Observable.throw(error); // here, response is an error
        });
    }


    /*
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setParams: {
                realm: 'jhipster'
            }
        });
        console.log('TenantInterceptor.setParams', request.params)
        return next.handle(request);
    }
*/
}

