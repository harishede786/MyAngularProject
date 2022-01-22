import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { DataServiceMock } from 'src/assets/mocks/service-mock';
import { AppComponent } from './app.component';
import { DataService } from './service';
import { contactMock, contactsMock } from '../assets/mocks/service-mock';
import { DialogComponent } from './dialog/dialog.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let service: DataService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<DialogComponent>;
  const dialogRefMock = {
    open: () => { },
    close: () => { },
    afterClosed: () => of(contactMock)
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: DataService, useValue: DataServiceMock }, MatDialog,
      { provide: MatDialogRef, useValue: dialogRefMock }, { provide: MAT_DIALOG_DATA, useValue: { data: 'test' } }]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(DataService);
    app = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'contact-list-app'`, () => {
    expect(app.title).toEqual('Contact List App');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.innerHTML).toContain('Contact List App');
  });
  it('should call service and set data', () => {
    spyOn(service, "getContactList").and.callThrough();
    app.ngOnInit();
    expect(app.data[0].firstName).toEqual('Aakash');
  });
  it('should delete a contact', () => {
    app.deleteContact(contactMock);
    expect(app.data.length).toEqual(0);
  });

  
  it('should close1 dialog', fakeAsync(() => {
    const dialogRef = dialog.open(DialogComponent);
    app.openDialog(0, contactMock);
    fixture.detectChanges();
    dialogRef.afterClosed().subscribe((value) => {
      expect(value).toEqual(contactMock);
    })
  }));
  it('should close2 dialog', fakeAsync(() => {
    const dialogRef = dialog.open(DialogComponent);
    app.openDialog(1);
    fixture.detectChanges();
    dialogRef.afterClosed().subscribe((value) => {
      expect(value).toEqual(contactMock);
    })
  }));
  it('should close3 dialog', fakeAsync(() => {
    spyOn(dialogRef,'afterClosed').and.returnValue(of(true));
    app.openDialog(1);
    fixture.detectChanges();
    dialogRef.afterClosed().subscribe((value) => {
      expect(value).toEqual(true);
    })
  }));
  it('should open dialog', () => {
    app.data.push(contactMock)
    app.openDialog(0, contactMock);
    expect(app.data[0].firstName).toEqual('Aakash');
  });

  it('should sort on compare', () => {
    expect(app.compare(contactsMock[0], contactsMock[1])).toEqual(1);
  });
  it('should sort on compare', () => {
    expect(app.compare(contactsMock[1], contactsMock[0])).toEqual(-1);
  });
});
