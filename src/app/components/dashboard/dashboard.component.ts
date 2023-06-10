import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { User } from '../../interface/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  usersList : User[] = [];
  errorMessage: string ='';
  selectAll: boolean = false;
  selectedItems: User[] = [];
  isRowSelected: boolean = false;
  private deleteButtonSubscription?: Subscription;
  sortOrder: string = 'asc';
  activeSortColumn: string | null = null;
  @ViewChild(DeleteModalComponent, { static: false }) deleteModal: DeleteModalComponent | null = null;

  constructor(private userServices : UsersService, private cdRef: ChangeDetectorRef, private sharedService: SharedService){}

  ngOnInit() {
    this.getAllUser();
    this.deleteButtonSubscription = this.sharedService.deleteButtonClicked.subscribe(() => {
      this.deleteSelectedUsers();
    });
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
    this.selectedItems = this.usersList.filter(user => user.selected);
    const userIds = this.selectedItems.map(user => user.id);
    this.usersList = this.usersList.filter(user => !userIds.includes(user.id));
    this.cdRef.detectChanges();
  }

  // Delete button click open modal
  openDeleteModal() {
    if (this.deleteModal) {
      this.deleteModal.openModal();
    }
  }

  // row delete button click
  deleteUser(selectedUser: User){
    this.openDeleteModal();
    // Update the selected user
    this.usersList.forEach((user) => {
      if (user === selectedUser) {
        user.selected = true;
      } else {
        user.selected = false;
      }
    });
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

  sortBy(column: string, type: string) {
    // sorting logic here
    this.sortOrder = type;
    this.usersList.sort((a, b) => {
      const valueA = this.getUserValue(a, column);
      const valueB = this.getUserValue(b, column);

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.activeSortColumn = column;
  }

  getUserValue(user: any, column: string): any {
    const userprop = column.split('.');
    let u = user;
    for (const prop of userprop) {
      u = u[prop];
    }
    return u;
  }

  ngOnDestroy(): void {
    this.deleteButtonSubscription?.unsubscribe();
  }
}
