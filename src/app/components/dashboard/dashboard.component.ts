import { ChangeDetectorRef, Component, OnInit, ViewChild  } from '@angular/core';
import { User } from '../../interface/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usersList : User[] = [];
  errorMessage: string ='';
  selectAll: boolean = false;
  selectedItems: User[] = [];
  isRowSelected: boolean = false;
  @ViewChild(DeleteModalComponent, { static: false }) deleteModal: DeleteModalComponent | null = null;

  constructor(private userServices : UsersService, private cdRef: ChangeDetectorRef){}

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this.userServices.getAllUser().subscribe(
      (users: User[]) => {
        // Handle the received user data
        this.usersList =users;
      },
      (error: any) => {
        // Handle the error
        this.errorMessage = error;
      }
    );
  }

  deleteSelectedUsers() {
    const userIds = this.selectedItems.map(user => user.id);
    this.usersList = this.usersList.filter(user => !userIds.includes(user.id));
    console.log(this.usersList);
    this.cdRef.detectChanges();
  }

  sortBy(column: string) {
    // Implement your sorting logic here
    console.log("hi");
  }

  selectAllRows() {
    this.isRowSelected = this.selectAll;
    for (const user of this.usersList) {
      user.selected = this.selectAll;
    }
  }

  updateRowSelection() {
    this.isRowSelected = this.usersList.some(user => user.selected);
  }

  openDeleteModal() {
    debugger;
    if (this.deleteModal) {
      this.deleteModal.openModal();
    }
  }
}
