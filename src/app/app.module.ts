import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeformComponent } from './Employee/employeeform/employeeform.component';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { ArrFormComponent } from './arr-form/arr-form.component';
import { AddstudentComponent } from './students/addstudent/addstudent.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { AfterLoginComponent } from './after-login/after-login.component';
import { BeforeLoginComponent } from './before-login/before-login.component';
import { TodoFirstComponent } from './TodoList/todo-first/todo-first.component';
import { IndianCurrencyPipe } from './core/pipes/indian-currency.pipe';
import { ErrorHandlerService } from './shared/error-handler.service';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { InvoiceComponent } from './invoice/invoice.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { WizardComponent } from './wizard/wizard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WelcomeComponent } from './QuizApp/welcome/welcome.component';
import { QuizHeaderComponent } from './QuizApp/quiz-header/quiz-header.component';
import { QuestionComponent } from './QuizApp/question/question.component';
import { CreateTableComponent } from './sql/create-table/create-table.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { SqlTableListComponent } from './sql/sql-table-list/sql-table-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    UserListComponent,
    SidebarComponent,
    EmployeeformComponent,
    EmployeeListComponent,
    ArrFormComponent,
    AddstudentComponent,
    StudentListComponent,
    NavbarComponent,
    AfterLoginComponent,
    BeforeLoginComponent,
    TodoFirstComponent,
    IndianCurrencyPipe,
    InvoiceComponent,
    WizardComponent,
    FileUploadComponent,
    WelcomeComponent,
    QuizHeaderComponent,
    QuestionComponent,
    CreateTableComponent,
    SqlTableListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    NgxSpinnerModule,
    DataTablesModule,
    NgxExtendedPdfViewerModule,
    HighlightJsModule 

  ], providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// providers: [{
//   // processes all errors
//   provide: ErrorHandler,
//   useClass: ErrorHandlerService,
// }],