import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { InputCellComponent } from "./input-cell.component";

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
  private columnDefs = [
    {
      headerName: "Column 1*",
      field: "col1",
      colId: "col1",
      cellRendererFramework: InputCellComponent
    },
    {
      headerName: "Column 2",
      field: "col2",
      colId: "col2",
      cellRendererFramework: InputCellComponent
    },
    {
      headerName: "Column 3",
      field: "col3",
      colId: "col3",
      cellRendererFramework: InputCellComponent
    }
  ];

  public form: FormArray = this.fb.array([]);
  public formGroup: FormGroup = this.fb.group({
    name: ["", Validators.required],
    table: this.form
  });
  private readonly errorMessages: Map<string, Map<string, string>> = new Map<
    string,
    Map<string, string>
  >([
    [
      "col1",
      new Map<string, string>([
        ["required", "Please enter a value for this field"]
      ])
    ],
    ["col2", new Map<string, string>([])],
    [
      "col3",
      new Map<string, string>([
        ["minlength", "Please enter at least 2 characters"]
      ])
    ]
  ]);
  public gridOptions = {
    columnDefs: this.columnDefs,
    context: {
      formArray: this.form,
      errorMessages: this.errorMessages
    }
  };

  private api: GridApi;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    // Whenever form state changes evaluate height of cells
    // If error message needs to be displayed, increase cell height
    this.form.statusChanges.subscribe(() => {
      if (!!this.api) {
        for (let i = 0; i < this.form.length; i++) {
          if (this.form.at(i).invalid) {
            this.api.getRowNode(i.toString()).setRowHeight(64);
          } else {
            this.api.getRowNode(i.toString()).setRowHeight(48);
          }
        }
        this.api.onRowHeightChanged();
      }
    });
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
    this.api.refreshCells({ force: true });
  }

  onGridReady(params) {
    this.api = params.api;
    this.refreshTable();
  }

  onSubmit(params) {
    console.log("submit pressed", this.formGroup.value);
  }
}
