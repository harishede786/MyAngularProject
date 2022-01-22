import { of } from "rxjs";

export const DataServiceMock = {
    getContactList: () => of([contactMock])
}

export const MatDialogMock = {
    open: () => of(),
    close: () => of(),
}

export const contactMock = {
    firstName: 'Aakash',
    lastName: 'Choudhury',
    id: '2',
    phone: '9876584431'
}

export const contactsMock = [{
    firstName: 'Aakash',
    lastName: 'Choudhury',
    id: '2',
    phone: '9876584431'
}, {
        firstName: 'Visakh',
        lastName: 'kumar',
        id: '1',
        phone: '9876584431'
    }];