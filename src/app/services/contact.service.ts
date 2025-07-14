import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Indirizzo API Mockoon (che schifo mockoon)
  private apiUrl = 'http://localhost:3000';

  // Iniezione HttpClient per chiamate web
  private http = inject(HttpClient);

  // Metodo per ottenere tutti i contatti.
  // Restituisce un Observable, un flusso di dati a cui ci si può "iscrivere".
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  // Metodo per eliminare un contatto sda ID.
  // Restituisce un Observable<unknown> perche' non c'e' server a da cui attendere la risposta,
  // mi serve solo sapere che l'operazione è andata a buon fine.
  deleteContact(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }
}