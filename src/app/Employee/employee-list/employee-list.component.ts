import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from 'src/app/shared/loader.service';
import { DataTableService } from 'src/app/shared/data-table.service';
import { AgeCalculationService } from 'src/app/shared/age-calculation.service';
import { error } from 'jquery';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];
  constructor(private empService: EmployeeService,
    private router: Router,
    private encryptionService: EncryptionService,
    private loaderService: LoaderService,
    private dataTableService: DataTableService,
    private ageCalculationService: AgeCalculationService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.loaderService.showLoader();
    this.empService.getEmployeeList().subscribe(item => {
      this.employeeList = item;
      this.employeeList.forEach((element, index) => {
        let ageObject = this.ageCalculationService.calculateAge(element.dob);
        let age = (ageObject.years != 0 ? ageObject.years + 'Y-' : '') + (ageObject.months != 0 ? ageObject.months + 'M-' : '') + ageObject.days + 'D';
        this.employeeList[index].age = age
      });

      this.dataTableService.bindTable('employeeTable', 5);
      setTimeout(() => {
        this.loaderService.hideLoader();
      }, 1000);
    })
  }

  onEdit(id: any) {
    let encData = this.encryptionService.encrypt(id);
    console.log("encData = " + encData);
    let decData = this.encryptionService.decrypt(encData);
    console.log("decData = " + decData)

    let encryptId = btoa(id);
    this.router.navigate([`/editemployee/${encryptId}`])
  }

}
