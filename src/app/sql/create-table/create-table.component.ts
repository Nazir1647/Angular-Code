import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  public tableForm: FormGroup;
  tableList: any;
  columnList: any;
  copiedItem: string | null = null;
  tableCreationSQL: string = '';
  isCheckAll: boolean = false;

  // constructor code here
  constructor(private sqlService: SqlService,
    private fb: FormBuilder) {
    this.tableForm = this.fb.group({
      tableName: ["", Validators.required],
      columns: this.fb.array([], [Validators.required])
    });
    this.addRow();
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addRow() {
    const control = this.tableForm.get('columns') as FormArray;
    control.push(this.createFormGroup());
  }

  get getFormControls() {
    const control = this.tableForm.get('columns') as FormArray;
    return control;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required]],
      length: [''],
      isPrimaryKey: [false],
      isIdentity: [false],
      isNull: [false],
      defaultValue: [''],
      ischecked: [false]
    });
  }

  updateTableName(event: any) {
    this.tableForm.controls['tableName'].setValue(event.target.value);
  }

  onSaveForm() {
    const formValue = this.tableForm.value;
    this.sqlService.saveTable(formValue).subscribe((res: any) => {
      console.log(res);
    });
  }

  removeColumn(index: number) {
    const control = this.tableForm.get('columns') as FormArray;
    control.removeAt(index);
  }

  columnNameChange(event: any, index: number) {
    let columnName = event.target.value;
    switch (columnName.toLowerCase()) {
      case 'id':
        this.getFormControls?.controls[index]?.get('type').setValue('INT');
        this.getFormControls?.controls[index]?.get('isPrimaryKey').setValue(true);
        this.getFormControls?.controls[index]?.get('isIdentity').setValue(true);
        break;
      case 'name':
        this.getFormControls?.controls[index]?.get('type').setValue('NVARCHAR');
        this.getFormControls?.controls[index]?.get('length').setValue('50');
        break;
      default:
        this.getFormControls?.controls[index]?.get('type').setValue('NVARCHAR');
        this.getFormControls?.controls[index]?.get('length').setValue('100');
        this.getFormControls?.controls[index]?.get('isNull').setValue(true);
        break;
    }
  }

  checkPrimary(e: any, index: number) {
    let value = e.target.value;
    let isChecked = e.target.checked;

    let PrimaryKeyCount = 0;
    this.getFormControls?.controls.forEach((element, i) => {
      debugger
      if (element?.get('isPrimaryKey').value) {
        if (PrimaryKeyCount == 0)
          PrimaryKeyCount++;
        else {
          alert('table can have only one primary key');
          this.getFormControls?.controls[index]?.get('isPrimaryKey').setValue(false);
        }
      }
    });
  }

}
