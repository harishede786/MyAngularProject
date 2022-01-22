import { Component } from '@angular/core';
import { Contact } from 'src/interfaces/contact.interface';
import { DataService } from './service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Contact List App';
  public data: Contact[] = [];
  constructor(private service: DataService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.service.getContactList().subscribe((value: Contact[]) => {
      this.data = value
    })
  }
  deleteContact(contact: Contact): void {
    this.data = this.data
    this.data = this.data.filter((val) => val.id !== contact.id);
  }
  openDialog(index: number, contact?: Contact,): void {
    if (contact) {
      const modifyDialogRef = this.dialog.open(DialogComponent, {
        data: contact
      });

      modifyDialogRef.afterClosed().subscribe(contactData => {
        if (contactData) {
          this.data[index] = contactData;
          this.data.sort(this.compare);
        }
      });
    } else {
      const addDialogRef = this.dialog.open(DialogComponent);
      addDialogRef.afterClosed().subscribe(contactData => {
        if (contactData) {
          this.data.push(contactData);
          this.data.sort(this.compare);
        }
      });
    }
  }
  

  compare(a: Contact, b: Contact) {
    if (a.id < b.id) {
      return -1;
    }
    else {
      return 1;
    }
  }

}

