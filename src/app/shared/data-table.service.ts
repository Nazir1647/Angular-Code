import { Injectable } from '@angular/core';
//declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  bindTable(tableId: string, pageLength: number = 10) {

    // var table = $('#' + tableId).DataTable();
    // if ($.fn.DataTable.isDataTable('#' + tableId)) {
    //   table.destroy();
    // }

  //   setTimeout(() => {
  //     $('#' + tableId).DataTable({
  //       destroy: true,
  //       pageLength: pageLength,
  //       processing: true,
  //       lengthMenu: [pageLength, 25, 50, 100],
  //     });
  //   }, 1000);
   }
}
