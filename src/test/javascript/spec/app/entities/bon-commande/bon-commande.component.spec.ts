/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GtwTestModule } from '../../../test.module';
import { BonCommandeComponent } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.component';
import { BonCommandeService } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.service';
import { BonCommande } from '../../../../../../main/webapp/app/entities/bon-commande/bon-commande.model';

describe('Component Tests', () => {

    describe('BonCommande Management Component', () => {
        let comp: BonCommandeComponent;
        let fixture: ComponentFixture<BonCommandeComponent>;
        let service: BonCommandeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GtwTestModule],
                declarations: [BonCommandeComponent],
                providers: [
                    BonCommandeService
                ]
            })
            .overrideTemplate(BonCommandeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BonCommandeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonCommandeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BonCommande(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bonCommandes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
