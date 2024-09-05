import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeformComponent } from './Employee/employeeform/employeeform.component';
import { ArrFormComponent } from './arr-form/arr-form.component';
import { AddstudentComponent } from './students/addstudent/addstudent.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { BeforeLoginComponent } from './before-login/before-login.component';
import { TodoFirstComponent } from './TodoList/todo-first/todo-first.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { WizardComponent } from './wizard/wizard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuizHeaderComponent } from './QuizApp/quiz-header/quiz-header.component';
import { WelcomeComponent } from './QuizApp/welcome/welcome.component';
import { QuestionComponent } from './QuizApp/question/question.component';
import { CreateTableComponent } from './sql/create-table/create-table.component';
import { SqlTableListComponent } from './sql/sql-table-list/sql-table-list.component';

const routes: Routes = [
  {
    path: '', component: BeforeLoginComponent, children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full', },
      { path: 'signin', component: SigninComponent },//, canActivate: [IsLoggedIn]  
    ]
  },
  {
    path: '', component: QuizHeaderComponent, children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full', },
      { path: 'welcome', component: WelcomeComponent },  
      { path: 'question', component: QuestionComponent },  
    ]
  },
  {
    path: '', component: AfterLoginComponent, children: [
      { path: 'signupComponent', component: SignupComponent },
      {
        path: 'employee', component: EmployeeListComponent, canActivate: [AuthGuard], 
        data: {
          role: 'admin'
        }
      },
      { path: 'addemployee', component: EmployeeformComponent,canActivate: [AuthGuard] },
      { path: 'invoice', component: InvoiceComponent,canActivate: [AuthGuard] },
      { path: 'arrform', component: ArrFormComponent,canActivate: [AuthGuard] },
      { path: 'editemployee/:id', component: EmployeeformComponent,canActivate: [AuthGuard] },
      { path: 'addStudent', component: AddstudentComponent,canActivate: [AuthGuard] },
      { path: 'todo', component: TodoFirstComponent,canActivate: [AuthGuard] },
      { path: 'wizard', component: WizardComponent,canActivate: [AuthGuard] },
      { path: 'fileupload', component: FileUploadComponent,canActivate: [AuthGuard] },
      { path: 'table', component: CreateTableComponent,canActivate: [AuthGuard] },
      { path: 'table-list', component: SqlTableListComponent,canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/addStudent', pathMatch: 'full' } // Redirect any invalid route to 'home'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
