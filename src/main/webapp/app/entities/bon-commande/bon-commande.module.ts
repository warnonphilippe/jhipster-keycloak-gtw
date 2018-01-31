import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GtwSharedModule } from '../../shared';
import {
    BonCommandeService,
    BonCommandePopupService,
    BonCommandeComponent,
    BonCommandeDetailComponent,
    BonCommandeDialogComponent,
    BonCommandePopupComponent,
    BonCommandeDeletePopupComponent,
    BonCommandeDeleteDialogComponent,
    bonCommandeRoute,
    bonCommandePopupRoute,
    BonCommandeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bonCommandeRoute,
    ...bonCommandePopupRoute,
];

@NgModule({
    imports: [
        GtwSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BonCommandeComponent,
        BonCommandeDetailComponent,
        BonCommandeDialogComponent,
        BonCommandeDeleteDialogComponent,
        BonCommandePopupComponent,
        BonCommandeDeletePopupComponent,
    ],
    entryComponents: [
        BonCommandeComponent,
        BonCommandeDialogComponent,
        BonCommandePopupComponent,
        BonCommandeDeleteDialogComponent,
        BonCommandeDeletePopupComponent,
    ],
    providers: [
        BonCommandeService,
        BonCommandePopupService,
        BonCommandeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GtwBonCommandeModule {}
