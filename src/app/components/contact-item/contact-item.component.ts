import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  // @Input() permette al componente di ricevere dati.
  // `input.required` = input obbligatorio.
  public contact = input.required<Contact>();

  // @Output() permette al componente di emettere eventi.
  // In questo caso, faremo uscire l'ID del contatto da eliminare.
  @Output() deleteRequest = new EventEmitter<number>();

  // Metodo chiamato quando clicco il bottone "Elimina"
  onDeleteClick(): void {
    // evento 'deleteRequest' con l'ID del contatto, (contact-list) sarà in ascolto di questo evento.
    
    this.deleteRequest.emit(this.contact().id);
  }
}