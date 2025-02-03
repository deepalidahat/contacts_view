import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Chat', icon: 'fas fa-comment', link: '/chat' },
    { label: 'Calendar', icon: 'fas fa-calendar', link: '/calendar' },
    { label: 'Email', icon: 'fas fa-envelope', link: '/email' },
    { label: 'Kanban', icon: 'fas fa-columns', link: '/kanban' },
    { label: 'Contacts', icon: 'fas fa-phone', link: '/contacts' },
    { label: 'Contact List', icon: 'fas fa-address-book', link: '/contact-list', badge: 'New', active: true },
    { label: 'Courses', icon: 'fas fa-book', link: '/courses' },
    { label: 'Employee', icon: 'fas fa-user-shield', link: '/employee' },
    { label: 'Notes', icon: 'fas fa-sticky-note', link: '/notes' }
  ];
}
