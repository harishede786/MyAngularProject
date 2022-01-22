import { Component, Inject, OnInit } from '@angular/core';
import { Contact } from 'src/interfaces/contact.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public reactiveForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    id: new FormControl(''),
    phone: new FormControl('')
  });


  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data?: Contact,
  ) {
    if (data) {
      this.reactiveForm.setValue(data);
    }
  }


  ngOnInit(): void {
  }
  submitContact() {
    console.log(this.reactiveForm.value);
    const contactData = this.reactiveForm.value;
    this.dialogRef.close(contactData);
  }

}

