import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BonCommande } from './bon-commande.model';
import { BonCommandeService } from './bon-commande.service';

@Component({
    selector: 'jhi-bon-commande-detail',
    templateUrl: './bon-commande-detail.component.html'
})
export class BonCommandeDetailComponent implements OnInit, OnDestroy {

    bonCommande: BonCommande;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bonCommandeService: BonCommandeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBonCommandes();
    }

    load(id) {
        this.bonCommandeService.find(id).subscribe((bonCommande) => {
            this.bonCommande = bonCommande;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBonCommandes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bonCommandeListModification',
            (response) => this.load(this.bonCommande.id)
        );
    }
}
