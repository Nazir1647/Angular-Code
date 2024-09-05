import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent {

  stepList: any[] = [
    { step: 1,icon:'<i class="bi bi-person-fill-add"></i>', isComplete: true },
    { step: 2,icon:'<i class="bi bi-1-circle"></i>', isComplete: false },
    { step: 3,icon:'<i class="bi bi-1-square"></i>', isComplete: false },
    { step: 4,icon:'<i class="bi bi-1-circle-fill"></i>', isComplete: false },
  ]

  activeStep = 1;

  onNext(step: number) {
    let nextStep = step + 1;
    this.stepList.find(x => x.step == nextStep).isComplete = true;
    this.activeStep = nextStep;
  }

  onPrevious(step: number) {
    this.stepList.find(x => x.step == step).isComplete = false;
    let nextStep = step - 1;
    this.stepList.find(x => x.step == nextStep).isComplete = true;
    this.activeStep = nextStep;
  }
  onSubmit(){

  }

}
