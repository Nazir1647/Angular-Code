import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-sql-table-list',
  templateUrl: './sql-table-list.component.html',
  styleUrls: ['./sql-table-list.component.css']
})
export class SqlTableListComponent implements OnInit{

  tableList: any;
  columnList: any;
  employeeForm: FormGroup;
  copiedItem: string | null = null;

  tableCreationSQL: string = '';
  constructor(private sqlService: SqlService,
    private fb: FormBuilder
  ) {

    this.employeeForm = fb.group({
      name: ["", Validators.required]
    });

  }

  ngOnInit(): void {
    this.getTables();
  }

    getTables() {
    this.sqlService.getTable().subscribe({
      next: (res: any) => {
        debugger
        this.tableList = res;
        // this.tableList.forEach(element => {
        //   this.tableCreationSQL = this.generateCreateTableSQL(element);
        // });
      },
      error: (err: any) => {

      }
    });
  }

  generateCreateTableSQL(table: any): string {
    const tableName = table?.tableName; // Assuming tableId "1" corresponds to "Employee"
    let sql = `CREATE TABLE ${tableName} (\n    `;

    const columnsSql = table.columns.map((column: any) => {
      debugger
      let columnDef = `${column.name} `;

      // Determine the SQL data type based on the provided type
      switch (column.type) {
        case 'INT':
          columnDef += 'INT ';
          break;
        case 'NVARCHAR':
          columnDef += `NVARCHAR(${column.length || 255}) `;
          break;
        case 'DECIMAL':
          columnDef += `DECIMAL(${column.precision || 18}, ${column.scale || 0}) `;
          break;
        case 'DATE':
          columnDef += 'DATE ';
          break;
        default:
          columnDef += 'NVARCHAR(255) '; // Default type if not specified
      }

      // Add constraints
      if (column.isPrimaryKey) {
        columnDef += 'PRIMARY KEY ';
      }
      if (column.isIdentity) {
        columnDef += 'IDENTITY(1,1) ';
      }
      if (column.isNull === false) {
        columnDef += 'NOT NULL ';
      } else {
        columnDef += 'NULL ';
      }

      // Add default value
      if (column.defaultValue !== "") {
        columnDef += `DEFAULT ${column.defaultValue} `;
      }

      return columnDef.trim();
    }).join(',\n    ');

    // Closing the table definition
    sql += columnsSql;
    sql += '\n);';

    return sql;
  }

  onSaveTable() {
    console.log(this.employeeForm.value);
  }

  copyToClipboard(text: string, tableName: string): void {

    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.copiedItem = tableName;

    setTimeout(() => {
      this.copiedItem = null;
    }, 2000);
  }

}
