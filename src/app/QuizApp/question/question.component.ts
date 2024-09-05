import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList: any[] = [];
  name = localStorage.getItem('name');
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer :number = 0;
  inCorrectAnswer :number = 0;
  interval$:any;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.startCounter();
  }

  getQuestion() {
    this.questionsService.getQuestion().subscribe(res => {
      this.questionList = res?.questions;
      console.log(this.questionList)
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();
  }

  previousQuestion() {
    this.currentQuestion--;
  }
  resetQuestion() {
    this.currentQuestion = 0;
    this.resetCounter();
    this.getQuestion();
    this.points = 0;
    this.counter = 60;
  }

  answer(currentQuestion: number, option: any) {
    if (option.correct) {
      this.points += 10;   
      this.correctAnswer++;
    }else{
      this.points -= 10; 
      this.inCorrectAnswer++;
    }
    this.resetCounter();
    this.currentQuestion++;
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

}
