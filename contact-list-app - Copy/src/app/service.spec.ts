import { TestBed } from '@angular/core/testing';
import { contactMock } from 'src/assets/mocks/service-mock';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './service';

describe('DialogComponent', () => {
    let service: DataService;
    let httpTestingController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [DataService],

        })
            .compileComponents();
    });

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.inject(DataService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('returned Observable should match the right data', () => {

        service.getContactList()
            .subscribe(contacts => {
                expect(contacts[0].firstName).toEqual('Aakash');
            });

        const req = httpTestingController.expectOne('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');

        expect(req.request.method).toEqual('GET');

        req.flush([contactMock]);
    });

});
