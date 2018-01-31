import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BonCommande } from './bon-commande.model';
import { BonCommandePopupService } from './bon-commande-popup.service';
import { BonCommandeService } from './bon-commande.service';
import { Fournisseur, FournisseurService } from '../fournisseur';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bon-commande-dialog',
    templateUrl: './bon-commande-dialog.component.html'
})
export class BonCommandeDialogComponent implements OnInit {

    bonCommande: BonCommande;
    isSaving: boolean;

    fournisseurs: Fournisseur[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bonCommandeService: BonCommandeService,
        private fournisseurService: FournisseurService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fournisseurService.query()
            .subscribe((res: ResponseWrapper) => { this.fournisseurs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bonCommande.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bonCommandeService.update(this.bonCommande));
        } else {
            this.subscribeToSaveResponse(
                this.bonCommandeService.create(this.bonCommande));
        }
    }

    private subscribeToSaveResponse(result: Observable<BonCommande>) {
        result.subscribe((res: BonCommande) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BonCommande) {
        this.eventManager.broadcast({ name: 'bonCommandeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFournisseurById(index: number, item: Fournisseur) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bon-commande-popup',
    template: ''
})
export class BonCommandePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bonCommandePopupService: BonCommandePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bonCommandePopupService
                    .open(BonCommandeDialogComponent as Component, params['id']);
            } else {
                this.bonCommandePopupService
                    .open(BonCommandeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
