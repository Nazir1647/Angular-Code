import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { Subject, } from 'rxjs';
import { DataTableService } from '../shared/data-table.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  userDetails: any;
  @Output() editData: any = new EventEmitter();
  dtTrigger: Subject<any> = new Subject<any>();

  popoverTitle = 'Delete confirm!';
  popoverMessage = 'Are you sure want to delete?';
  confirmClicked = false;
  cancelClicked = false;
  dtOptions: any = {

  };


  constructor(private signup: SignupService,
    private dataTableService: DataTableService
  ) { }


  ngOnInit(): void {
    this.onGetUserList();
    this.dataTableService.bindTable("tbl");
  }

  onGetUserList() {
    this.signup.getUser().subscribe((res) => {
      this.userList = res;
    });
  }

  onEdit(id: string) {
    this.editData.emit(id);
  }

  onDelete(id: string) {
    this.signup.deleteUser(id).subscribe(res => {
      alert("Data delete successfully");
      this.onGetUserList();
    });
  }

}
