import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "src/interfaces/contact.interface";

@Injectable()

export class DataService {
    private configUrl = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

    constructor(private http: HttpClient) {};
    
    getContactList(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.configUrl);
    }

}