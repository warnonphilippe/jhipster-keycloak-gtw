import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GtwBonCommandeModule } from './bon-commande/bon-commande.module';
import { GtwFournisseurModule } from './fournisseur/fournisseur.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GtwBonCommandeModule,
        GtwFournisseurModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GtwEntityModule {}
