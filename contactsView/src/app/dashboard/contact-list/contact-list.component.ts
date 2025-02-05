import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services.service';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { contactDetails } from '../contact-detail/data_type';
import {
  faStar,
  faEdit,
  faFloppyDisk,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  faStar = faStar;
  farStar = farStar;
  fasStar = fasStar;
  faEdit = faEdit;
  faFloppyDisk = faFloppyDisk;
  faTrashCan = faTrashCan;
  editContactDetails!: FormGroup;
  constructor(
    private contactService: ServicesService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.editContactDetails = this.fb.group({
      first_name: [''],
      last_name: [''],
      company_name: [''],
      phone_number: [''],
      email: [''],
      address: [''],
      note: [''],
      department: [''],
      image: ['../../../assets/img_4.png'],
      favorite: [false],
    });
  }
  ngOnInit(): void {
    this.getContactList();
  }

  contacts: any[] = [];
  searchTerm: string = '';
  departmentFilter: string = '';
  selectedContact: any;
  hideEditForm: boolean = false;
  showEditDetails: boolean = true;
  selectedContactId: any = null;
  hideIcon: boolean = true;
  getContactList() {
    this.contactService.getContacts().subscribe({
      next: (res: any) => {
        
        console.log('res for contact list', res);
        this.contacts = res;
        if (this.contacts.length > 0) {
          this.getSelectedContact(this.contacts[0]);
        }
      },
      error: (err) => {
        console.log('error for contact list', err);
      },
    });
  }

  // filteredContacts() {
  //   let filtered = this.contacts;

  //   if (this.searchTerm) {
  //     const searchTermLower = this.searchTerm.toLowerCase();
  //     filtered = filtered.filter((contact) =>
  //       (contact.first_name + ' ' + contact.last_name)
  //         .toLowerCase()
  //         .includes(searchTermLower)
  //     );
  //   }

  //   if (this.departmentFilter) {
  //     filtered = filtered.filter(
  //       (contact) =>
  //         contact.department.toLowerCase() ===
  //         this.departmentFilter.toLowerCase()
  //     );
  //   }

  //   return filtered;
  // }


  filteredContacts() {
    let filtered = this.contacts;
  
    // Filter by search term
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((contact) =>
        (contact.first_name + ' ' + contact.last_name)
          .toLowerCase()
          .includes(searchTermLower)
      );
    }
  
    // Filter by department
    if (this.departmentFilter) {
      filtered = filtered.filter(
        (contact) =>
          contact.department.toLowerCase() ===
          this.departmentFilter.toLowerCase()
      );
    }
  
    // Filter by starred contacts if the starred filter is active
    if (this.starredFilter) {
      filtered = filtered.filter((contact) => contact.favorite);
    }
  
    return filtered;
  }
  


  getCompDetails() {
    const modalRef = this.modalService.open(ContactDetailComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.contactAdded.subscribe(() => {
      this.getContactList();
    });
  }

  getStartted(contact: any) {
    const previousFavorite = contact.favorite;
    contact.favorite = !contact.favorite;
    console.log('contact.favorite', contact.favorite);
    this.contactService.updateContact(contact.id, { favorite: contact.favorite }).subscribe({
      next: (res) => {
        console.log('Contact updated successfully:', res);
      },
      error: (err) => {
        console.error('Failed to update contact:', err);
        contact.favorite = previousFavorite;
      },
    });
  }
  getDeleteContact(id: any) {
    alert('Delete Clicked! ID: ' + id);
    console.log('id for deleting contact:', id);
    this.getDeleteCont(id);
  }
  starredFilter: boolean = false; 
  getAllDetails() {
    console.log('for all');
    console.log('Filter for starred contacts');
  this.starredFilter = !this.starredFilter; // Toggle the starred filter state
    //this.getSelectedContact()
  }
  getDepartment(department: string) {
    console.log('for department', department);
    this.departmentFilter = department;
  }

  getSelectedContact(contact: any) {
    console.log('contact details', contact);
    this.selectedContact = contact;
  }
  getEditCont(id: any) {
    console.log('getEditCont', id);
    this.selectedContactId = id;
    this.hideIcon = false;
    this.hideEditForm = true;
    this.showEditDetails = false;
    this.contactService.getContacts(id).subscribe({
      next: (contactData: any) => {
        console.log('Fetched contact data:', contactData);
        this.editContactDetails.patchValue(contactData);
      },
      error: (err: any) => {
        console.error('Error fetching contact details:', err);
      },
    });
  }
  getDeleteCont(id: any) {
    console.log('getDeleteCont', id);
    this.contactService.deleteContact(id).subscribe({
      next: (res: any) => {
        console.log('res for delete record', res);
        this.hideEditForm = false;
        this.showEditDetails = true;
        this.getContactList();
      },
      error: (err) => {
        console.log('error for delete record', err);
      },
    });
  }
  getEditDetails(editContactDetails: contactDetails) {
    if (!this.selectedContactId) {
      console.error('No contact selected for editing!');
      return;
    }

    this.contactService
      .updateContact(this.selectedContactId, editContactDetails)
      .subscribe({
        next: (res) => {
          console.log('Contact updated successfully:', res);
          alert('Contact updated successfully!');
          this.hideEditForm = false;
          this.showEditDetails = true;
          this.getContactList();
        },
        error: (err) => {
          console.error('Error updating contact:', err);
        },
      });
  }
  getStarData(selectedContact: any) {
    console.log('enter fr str data', selectedContact);
    const previousFavorite = selectedContact.favorite;
    selectedContact.favorite = !selectedContact.favorite;
    this.contactService.updateContact(selectedContact.id, { favorite: selectedContact.favorite }).subscribe({
      next: (res) => {
        console.log('Contact updated successfully:', res);
      },
      error: (err) => {
        console.error('Failed to update contact:', err);
        selectedContact.favorite = previousFavorite;
      },
    });
  }
  getClose() {
    this.hideEditForm = false;
    this.showEditDetails = true;
  }
  editDetails(id: any) {
    console.log('enter dor daes');
    this.getEditCont(id);
  }
  saveDetails() {
    this.getEditDetails(this.editContactDetails.value);
  }
  deleteDetails(id: any) {
    this.getDeleteCont(id);
  }
}
