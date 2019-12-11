import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  message: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close('Y');
  }
  
  cancel() {
    this.activeModal.close('N');
  }

}
