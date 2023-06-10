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
    if (this.deleteModal) {
      this.deleteModal.openModal();
    }
  }

  ngOnDestroy(): void {
    this.deleteButtonSubscription?.unsubscribe();
  }
}
