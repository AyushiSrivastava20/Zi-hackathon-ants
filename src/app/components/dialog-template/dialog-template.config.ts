import {MatDialogConfig} from '@angular/material/dialog';

/**
 * Default configuration for all dialogs.
 */
export const DIALOG_TEMPLATE_CONFIG: MatDialogConfig = {
  /**
   * Whether the user can use escape or clicking on the backdrop to close the dialog.
   * This option is set to true - the user can't use escape or click outside the dialog to close.
   */
  disableClose: true,
  /**
   * Whether the dialog should have a shadow backdrop.
   * This option is set to true - there should be a shadow backdrop.
   */
  hasBackdrop: true,
  /*
    * Whether the dialog should close when the user goes backwards/forwards in history.
    * Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy).
   */
  closeOnNavigation: true,
};
