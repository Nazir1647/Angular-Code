import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {
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
  employeeForm: FormGroup;
  employeeDetails: any;
  buttonName = "Save";
  constructor(private empService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getCountry();

    let id = this.route.snapshot.params['id'];
    if (id != null)
      this.editData(id);

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [''],
      gender: [],
      country: ['', Validators.required],
      state: ['', Validators.required],
      dob: [''],
      hobbies: this.fb.array([], [Validators.required]),
      status: [false, Validators.requiredTrue]
    });

    this.employeeForm.controls['gender'].setValue(1);
    this.getControls['state'].disable();
  }

  get getControls() {
    return this.employeeForm.controls;
  }

  editData(id: any) {
    let decryptId = atob(id);
    this.empService.getEmployeeById(decryptId).subscribe((res: any) => {
      this.employeeDetails = res;
      this.getState(res.country, 2);

      this.employeeForm.patchValue({
        name: res.name,
        age: res.age,
        gender: res.gender,
        country: res.country,
        state: res.state,
        dob: res.dob
      });
      this.employeeForm.controls['status'].setValue(res.status);

      let hobbiesList = this.employeeForm.controls['hobbies'] as FormArray;

      this.hobbiesArr.forEach(item => {
        res.hobbies.forEach((hobby) => {
          if (hobby == item.value.toString()) {
            item.isSelected = true;
            hobbiesList.push(this.fb.control(hobby));
          }
        });
      });

      if (this.hobbiesArr.filter(x => x.isSelected == true).length > 0) {
        this.getControls['hobbies'].removeValidators(Validators.required);
        this.getControls['hobbies'].updateValueAndValidity();
      }

      this.buttonName = 'Update';
    });
  }

  getCountry() {
    this.empService.getCountry().subscribe({
      next: (value: any) => {
        this.countryList = value;
      },
      error: (error: any) => {
        console.error(error)
      }
      // complete: () => {
      //   console.log(' complete block')
      //  }
    });
  }

  getState(id: any, type: number) {

    let countryId = type == 1 ? id.target.value : id;
    this.employeeForm.controls['state'].setValue('');
    if (countryId == '') {
      this.stateList = null;
      this.getControls['state'].disable();
      return
    }
    this.getControls['state'].enable();
    this.empService.getState(countryId).subscribe({
      next: (value: any) => {
        this.stateList = value;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  bindState(id: any) {
    this.getState(id, 1);
  }

  onHobbiesSelect(event: any) {
    let checkedValue = event.target.checked;
    let value = event.target.value;


    let hobbiesList = this.employeeForm.controls['hobbies'] as FormArray;
    if (checkedValue) {
      hobbiesList.push(this.fb.control(value));
    } else {
      let i = 0;
      hobbiesList.controls.forEach(element => {
        if (element.value == value) {
          hobbiesList.removeAt(i);
        }
        i++;
      });
    }


    if (hobbiesList.value.length == 0) {
      this.getControls['hobbies'].setValidators(Validators.required);
      this.getControls['hobbies'].updateValueAndValidity();
    }
  }

  onSave() {
    let id = this.route.snapshot.params['id'];

    if (id == null) {
      this.empService.onSaveEmployee(this.employeeForm.value).subscribe((res) => {
        alert('Data saved');
        this.employeeForm.reset();
        this.router.navigate(['/employee'])
      });
    } else {
      this.empService.onUpdateEmployee(this.employeeForm.value, atob(id)).subscribe((res) => {
        alert('Data update');
        this.employeeForm.reset();
        this.router.navigate(['/employee'])
      });
    }
  }

}
