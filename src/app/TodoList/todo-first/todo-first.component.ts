import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import DataTables from 'datatables.net';
import { DataTableService } from 'src/app/shared/data-table.service';
import { ToastService } from 'src/app/shared/toast.service';
declare const $: any;
@Component({
  selector: 'app-todo-first',
  templateUrl: './todo-first.component.html',
  styleUrls: ['./todo-first.component.css']
})
export class TodoFirstComponent implements OnInit {
  bookForm: FormGroup;
  booksList: any[] = [];
  items = [];

  booksArr = [
    { id: "Physics", name: "Physics" },
    { id: "Chemistry", name: "Chemistry" },
    { id: "English", name: "English" },
    { id: "Hindi", name: "Hindi" }
  ]

  constructor(private fb: FormBuilder,
    private toastService: ToastService,
    private dataTableService: DataTableService
  ) {
    this.bookForm = fb.group({
      book: ['', Validators.required],
      quantity: [0, Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onGetbooksList();
    localStorage.removeItem('editId')
    let value = localStorage.getItem("booksItem");
    if (value != '' && value != null && typeof value != "undefined") {
      this.items = JSON.parse(value);
    }
  }

  onSave() {
    debugger
    let obj = {
      id: this.items.length + 1,
      book: this.bookForm.controls['book'].value,
      quantity: this.bookForm.controls['quantity'].value,
      price: this.bookForm.controls['price'].value
    }

    if (this.bookForm.valid) {

      if (localStorage.getItem("editId") == null) {

        if (this.items.find(x => x.book == this.bookForm.controls['book'].value)) {
          this.toastService.info('Record already exist..');
          return
        }
        this.items.push(obj);
        localStorage.setItem("booksItem", JSON.stringify(this.items));
        this.toastService.success('Record saved successfully..');
      }
      else {

        if (this.items.find(x => x.book == this.bookForm.controls['book'].value && x.id != localStorage.getItem('editId'))) {
          this.toastService.info('Record already exist..');
          return
        }

        let index = this.items.findIndex(x => x.id == localStorage.getItem('editId'));
        this.items.splice(index, 1);
        this.items.push(obj);
        localStorage.setItem("booksItem", JSON.stringify(this.items));
        this.toastService.success('Record updated successfully..');
      }
      this.onGetbooksList();
      localStorage.removeItem('editId')
      this.onReset();
    }
  }

  onReset() {
    this.bookForm.reset();
    this.bookForm.controls['book'].setValue('');
  }

  onGetbooksList() {
    let booksData = localStorage.getItem("booksItem");
    this.booksList = JSON.parse(booksData);

  //  this.bindTable();
  }

  onEdit(data: any) {
    this.bookForm.patchValue({
      book: data.book,
      quantity: data.quantity,
      price: data.price
    });
    localStorage.setItem('editId', data.id)
  }

  onDelete(id: any) {
    debugger
    let index = this.items.findIndex(x => x.id == id);
    this.items.splice(index, 1);
    localStorage.setItem("booksItem", JSON.stringify(this.items));
    this.onGetbooksList();
    this.toastService.success('Record deleted successfully..');
  }

  getGrossPrice(): any {
    let gp = 0
    this.items.forEach(element => {
      gp = gp + (element.quantity * element.price);
    })
    return gp;
  }

  bindTable() {
    setTimeout(() => {
      $('#todo').DataTable({
        // destroy: true,
        // pageLength: 10,
        // processing: true,
        // lengthMenu: [10, 25, 50, 100],
      });
    }, 1000);
  }

}
