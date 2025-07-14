import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  // Iniezione del servizio
  private contactService = inject(ContactService);

  // questo e' un "signal" per contenere la lista dei contatti.
  // Un signal è un contenitore di un valore reattivo: quando il suo valore cambia,
  // la pagina (HTML) che lo usa si aggiorna automaticamente.
  public contacts = signal<Contact[]>([]);

  ngOnInit(): void {
    // Chiamare il servizio per ottenere i contatti
    this.contactService.getContacts().subscribe(data => {
      // Quando i dati arrivano, si aggiorna il valore di sto cazzo di signal
      this.contacts.set(data);
    });
  }

  // Metodo la richiesta di eliminazione contatti (pulizia contatti)
  handleDelete(contactId: number): void {
    this.contactService.deleteContact(contactId).subscribe({
      next: () => {
        
        console.log(`Contatto con id ${contactId} eliminato dal server.`);
        // nel caso in cui la chiamata http vada a buon finbe, aggiorniamo il nostro signal rimuovendo l'elemento eliminato e aggiornera' l'interfaccia.
        this.contacts.update(currentContacts =>
          currentContacts.filter(contact => contact.id !== contactId)
        );
      },
      error: (err) => console.error('Errore durante l\'eliminazione:', err)
    });
  }
}