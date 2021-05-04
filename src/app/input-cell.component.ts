import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from 'ag-grid-community';

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mds-input-cell',
  templateUrl: './input-cell.component.html',
})
export class InputCellComponent implements ICellRendererAngularComp {

  control: FormControl;

  errorMessages: Map<string, string>;

  get errorMessage(): string {
    let message = '';
    if (!!this.errorMessages) {
      for (const error of Object.keys(this.control.errors ?? {})) {
        message = this.errorMessages.get(error) || '. ' || message;
      }
    }
    return message;
  }


  agInit(params: ICellRendererParams): void {
    // Store error messages for this column
    this.errorMessages = params.context.errorMessages.get(params.colDef.colId);
    // Refresh the cell
    this.refresh(params);
  }

  /**
   * Refresh cell controls value
   * @param params
   */
  refresh(params: any): boolean {
    if (!!params.context.formArray.at(parseInt(params.node.id))?.get(params.colDef.colId)) {
      this.control = params.context.formArray.at(parseInt(params.node.id)).get(params.colDef.colId) as FormControl;
      this.control.setValue(params.value, {emitEvent: false});
    }
    return !!this.control;
  }
}
