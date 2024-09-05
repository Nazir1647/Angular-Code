import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { DataTableService } from 'src/app/shared/data-table.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit,AfterViewInit {//OnInit
  @Input() studentList:any[] = [];
  datalist:any=[];
  CheckedItem: any[] = [];
  // @Output() studentDetails: any = new EventEmitter();
  @Output() studentDetails = new EventEmitter<{ data: any, type: string }>();

  constructor(private dataTableService: DataTableService,
    private toastService:ToastService
  ){}

  ngOnInit(): void {
   // this.dataTableService.bindTable('studentTable');
  }

  ngAfterViewInit(): void {
    this.dataTableService.bindTable('studentTable');
  }
  // for checked all and unChecked start
  rowCheckboxStates: boolean[] = [];
  @ViewChildren('rowCheckboxes') rowCheckboxes: QueryList<ElementRef>;
  @ViewChild('headerCheckbox') headerCheckbox: ElementRef;
   // for checked all and unChecked end

  onSendDetails(data: any, type: string) {
    this.studentDetails.emit({ data: data, type: type });
    // this.studentDetails.emit(data);
  }

   // for checked all and unChecked start
  toggleAll(isChecked: boolean): void {
    this.rowCheckboxStates.fill(isChecked); // to show checkbox is checked in display screen
    this.rowCheckboxes.forEach(checkbox => (checkbox.nativeElement.checked = isChecked));
  }

  updateSelectAll(): void {
    const allChecked = this.rowCheckboxes.toArray().every(checkbox => checkbox.nativeElement.checked);
    this.headerCheckbox.nativeElement.checked = allChecked;
  }

  DeleteAll(): void {
    const checkedValues: number[] = [];
    this.rowCheckboxes.forEach((checkbox, index) => {
      if (checkbox.nativeElement.checked) {
        checkedValues.push(checkbox.nativeElement.value); // You can push the index or any other value related to the checkbox
      }
    });
    if (checkedValues.length === 0)
      this.toastService.info('Please Select at least one items..');

    this.studentDetails.emit({ data: checkedValues, type: 'deleteAll' });
  }

   // for checked all and unChecked end


}
