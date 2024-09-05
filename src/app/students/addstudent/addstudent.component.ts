import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { DataTableService } from 'src/app/shared/data-table.service';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {
  //#region Variables
  @ViewChild('closeModal') closeModal!: ElementRef<HTMLButtonElement>;
  genderArr = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];

  hobbiesArr = [
    { value: 1, name: 'Cricket', isSelected: false },
    { value: 2, name: 'Football', isSelected: false },
    { value: 3, name: 'Tennis', isSelected: false },
    { value: 4, name: 'Hockey', isSelected: false }
  ];

  countryList: any = [];
  stateList: any = [];
  studentForm: FormGroup;
  employeeDetails: any;
  buttonName = "Save";
  submitted: boolean = false;
  studentList: any = [];

  //#endregion

  //#region pageLoad

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastService:ToastService,
    private dataTableService: DataTableService
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getStudentList();

    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required]],
      country: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  get studentControl() {
    return this.studentForm.controls;
  }

  //#endregion

  //#region  country and state
  getCountry() {
    this.studentService.getCountry().subscribe({
      next: (value: any) => {
        this.countryList = value;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  getState(id: any) {

    let countryId = id;
    this.studentForm.controls['state'].setValue('');
    if (countryId == '') {
      this.stateList = null;
      return
    }
    this.studentService.getState(countryId).subscribe({
      next: (value: any) => {
        this.stateList = value;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  bindState(id: any) {
    this.getState(id);
  }

  //#endregion

  //#region crud operation

  onSubmit() {
    if (this.buttonName === 'Save')
      this.onSave();
    else
      this.onUpdate();
  }

  onSave() {
    this.studentService.onSaveStudent(this.studentForm.value).subscribe({
      next: (data: any) => {
        this.toastService.success('Record save succesfully!!');
        this.onClose();
        this.getStudentList();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onUpdate() {
    this.studentService.onUpdateStudent(this.studentForm.value, localStorage.getItem('EditId')).subscribe({
      next: (data: any) => {
        this.toastService.success('Record update succesfully!!');
        this.onClose();
        this.getStudentList();
       // this.dataTableService.bindTable('studentTable');
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe({
      next: (data: any) => {
       // this.studentList = [];
        this.studentList = data;
        
   //    this.dataTableService.bindTable('studentTable');
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onDetailsGet(details: any) {
    if (details.type === 'edit')
      this.onEdit(details.data);
    else if (details.type === 'delete')
      this.onDelete(details.data)
    else if (details.type === 'deleteAll')
      this.onDeleteAll(details.data)
    else
      return;
  }

  onEdit(data: any) {
    this.getState(data?.country);
    this.studentForm.patchValue({
      email: data?.email,
      password: data?.password,
      country: data?.country,
      state: data?.state
    });
    localStorage.setItem('EditId', data.id);
    this.buttonName = 'Update';
  }

  onDelete(id: any) {
    this.studentService.onDeleteStudent(id).subscribe({
      next: (data: any) => {
        this.toastService.success('Record delete succesfully!!');
        this.getStudentList();
      },
      error: (error: any) => {
        this.toastService.error('something went wrong!');
      }
    });
  }

  onDeleteAll(data: any) {
    data.forEach(element => {
      this.onDelete(element);
    });
  }

  //#endregion

  onClose() {
    this.submitted = false;
    this.studentForm.reset();
    this.studentControl['country'].setValue('');
    this.studentControl['state'].setValue('');
    this.buttonName = 'Save';
    localStorage.removeItem('EditId');

    // let ref = document.getElementById('close');
    // ref?.click();

    this.closeModal.nativeElement.click();

  }
}
