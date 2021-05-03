import { Component } from "@angular/core";
import { GridApi } from "ag-grid-community";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public rowData = [
    {col1: 'abc', col2: 'def', col3: 'ghi'},
    {col1: 'def', col2: 'ghi', col3: 'jkl'},
    {col1: 'ghi', col2: 'jkl', col3: 'mno'},
  ];
  public columnDefs = [
    {field: 'col1'},
    {field: 'col2'},
    {field: 'col3'},
  ]
  private api: GridApi;
  onGridReady(params) {
    this.api = params.api;
  }
}
