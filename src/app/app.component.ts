import { Component, VERSION } from "@angular/core";
import { GridApi } from "ag-grid-community";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private api: GridApi;
  onGridReady(params) {
    this.api = params.api;
  }
}
