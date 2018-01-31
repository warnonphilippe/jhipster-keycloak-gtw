/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GtwTestModule } from '../../../test.module';
import { BonCommandeDetailComponent } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande-detail.component';
import { BonCommandeService } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.service';
import { BonCommande } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.model';

describe('Component Tests', () => {

    describe('BonCommande Management Detail Component', () => {
        let comp: BonCommandeDetailComponent;
        let fixture: ComponentFixture<BonCommandeDetailComponent>;
        let service: BonCommandeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GtwTestModule],
                declarations: [BonCommandeDetailComponent],
                providers: [
                    BonCommandeService
                ]
            })
            .overrideTemplate(BonCommandeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BonCommandeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonCommandeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BonCommande(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bonCommande).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
