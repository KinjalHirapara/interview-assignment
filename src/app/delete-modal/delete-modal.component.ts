import { Component, ViewChild, ElementRef } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  @ViewChild('modal', { static: false }) modal: ElementRef<any> | null = null;

  constructor(private sharedService: SharedService) {}

    openModal() {
      if(this.modal){
        this.modal.nativeElement.classList.add('show');
        this.modal.nativeElement.style.display = 'block';
      }

    }

    closeModal() {
      if(this.modal){
        this.modal.nativeElement.classList.remove('show');
        this.modal.nativeElement.style.display = 'none';
      }
    }

    DeleteClick(){
      this.sharedService.emitDeleteButtonClick();
      if(this.modal){
        this.modal.nativeElement.classList.remove('show');
        this.modal.nativeElement.style.display = 'none';
      }
    }
}
