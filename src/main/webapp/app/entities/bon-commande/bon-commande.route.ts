import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BonCommandeComponent } from './bon-commande.component';
import { BonCommandeDetailComponent } from './bon-commande-detail.component';
import { BonCommandePopupComponent } from './bon-commande-dialog.component';
import { BonCommandeDeletePopupComponent } from './bon-commande-delete-dialog.component';

@Injectable()
export class BonCommandeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const bonCommandeRoute: Routes = [
    {
        path: 'bon-commande',
        component: BonCommandeComponent,
        resolve: {
            'pagingParams': BonCommandeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BonCommandes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bon-commande/:id',
        component: BonCommandeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BonCommandes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bonCommandePopupRoute: Routes = [
    {
        path: 'bon-commande-new',
        component: BonCommandePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BonCommandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bon-commande/:id/edit',
        component: BonCommandePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BonCommandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bon-commande/:id/delete',
        component: BonCommandeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BonCommandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
