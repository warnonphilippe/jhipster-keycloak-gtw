/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GtwTestModule } from '../../../test.module';
import { BonCommandeDialogComponent } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande-dialog.component';
import { BonCommandeService } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.service';
import { BonCommande } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.model';
import { FournisseurService } from '../../../../../../main/webapp/app/entities/fournisseur';

describe('Component Tests', () => {

    describe('BonCommande Management Dialog Component', () => {
        let comp: BonCommandeDialogComponent;
        let fixture: ComponentFixture<BonCommandeDialogComponent>;
        let service: BonCommandeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GtwTestModule],
                declarations: [BonCommandeDialogComponent],
                providers: [
                    FournisseurService,
                    BonCommandeService
                ]
            })
            .overrideTemplate(BonCommandeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BonCommandeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonCommandeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BonCommande(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bonCommande = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bonCommandeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BonCommande();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bonCommande = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bonCommandeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
