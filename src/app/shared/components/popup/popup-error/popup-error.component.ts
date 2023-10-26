import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupErrorComponent implements OnInit {
  @Input() message!: string;

  constructor(
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    window.setTimeout(() => this.closeModal(), 2000);
  }

  closeModal() {
    this.activeModal.close();
  }
}
