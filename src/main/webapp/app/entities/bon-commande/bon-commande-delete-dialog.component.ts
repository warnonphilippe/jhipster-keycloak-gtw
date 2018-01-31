import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BonCommande } from './bon-commande.model';
import { BonCommandePopupService } from './bon-commande-popup.service';
import { BonCommandeService } from './bon-commande.service';

@Component({
    selector: 'jhi-bon-commande-delete-dialog',
    templateUrl: './bon-commande-delete-dialog.component.html'
})
export class BonCommandeDeleteDialogComponent {

    bonCommande: BonCommande;

    constructor(
        private bonCommandeService: BonCommandeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bonCommandeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bonCommandeListModification',
                content: 'Deleted an bonCommande'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bon-commande-delete-popup',
    template: ''
})
export class BonCommandeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bonCommandePopupService: BonCommandePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bonCommandePopupService
                .open(BonCommandeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
