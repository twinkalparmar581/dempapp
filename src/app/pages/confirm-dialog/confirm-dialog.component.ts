import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'vex-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent
{
    public confirmMessage!: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>
    )
    {
    }

}
