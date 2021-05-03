import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GridApi } from "ag-grid-community";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public rowData = [
    { col1: "abc", col2: "def", col3: "ghi" },
    { col1: "def", col2: "ghi", col3: "jkl" },
    { col1: "ghi", col2: "jkl", col3: "mno" }
  ];
  public columnDefs = [{ field: "col1" }, { field: "col2" }, { field: "col3" }];

  public formGroup: FormGroup;
  public form: FormArray;

  private api: GridApi;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      table: this.form
    });
    this.form = this.fb.array([]);
  }

  refreshTable() {
    this.form.clear();
    this.rowData.forEach(row => {
      this.form.push(
        this.fb.group({
          col1: [row.col1, Validators.required],
          col2: [row.col2],
          col3: [row.col3, Validators.minLength(2)]
        })
      );
    });
  }

  onGridReady(params) {
    this.api = params.api;
    this.refreshTable();
  }

  onSubmit(params) {
    console.log("submit pressed", params);
  }
}
