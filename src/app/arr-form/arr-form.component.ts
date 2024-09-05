import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-arr-form',
  templateUrl: './arr-form.component.html',
  styleUrls: ['./arr-form.component.css']
})
export class ArrFormComponent {

  constructor(
    private fb: FormBuilder,
  ) {}

  formGroup = this.fb.group({
    features: this.fb.array([this.fb.control('', Validators.required)])
  });

  get features(): FormArray {
    return this.formGroup.get('features') as FormArray;
  }

  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  getValidity(i) {
    return (<FormArray>this.formGroup.get('features')).controls[i].invalid;
  }

  removeFeature(index): void {
    this.features.removeAt(index);
    console.log(this.features);
  }

}
