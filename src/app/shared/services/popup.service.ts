import { Injectable } from '@angular/core';
import { PopupErrorComponent } from '../components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private modalService: NgbModal) {}

  showErrorMessage(message: string) {
    const modalReference = this.modalService.open(
      PopupErrorComponent,
      {
        backdrop: false
      }
    );

    modalReference.componentInstance.message = message;
  }
}
