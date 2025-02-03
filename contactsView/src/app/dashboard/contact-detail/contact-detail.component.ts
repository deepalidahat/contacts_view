import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { contactDetails } from './data_type';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  getAddContact!: FormGroup;
  @Output() contactAdded = new EventEmitter<void>();
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private contactService: ServicesService
  ) {
    this.getAddContact = this.fb.group({
      first_name: [''],
      last_name: [''],
      company_name: [''],
      phone_number: [''],
      email: [''],
      address: [''],
      note: [''],
      department: [''],
      image: ['../../../assets/img_5.png'], 
      favorite: [false] 
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  closeModal() {
    this.activeModal.close();
  }
  getSubmit(getAddContact: contactDetails) {
    if (this.getAddContact.valid) {
      console.log('get form data', getAddContact);
      this.contactService.postContact(getAddContact).subscribe({
        next: (res: any) => {
          console.log('res after adding contact  to list', res);
          this.contactAdded.emit(); 
          this.getAddContact.reset();
          this.closeModal();
        },
        error: (err) => {
          console.log('error after adding contact  to list', err);
        },
      });
    }
  }
}
