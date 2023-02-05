import {ErrorType} from '../../../types/core/error.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {
  }

  handle(error: ErrorType) {
    this._snackbar.open(this.getMsg(error), 'Close')
  }

  private getMsg(error: ErrorType): string {
    if (!error) {
      return 'Unexpected exception';
    }

    switch (error.status) {
      case 400:
        return `Bad Request: \n ${error.msg}`
      case 404:
        return 'Page not found';
      case 504:
        return 'Gateway timeout';
      default:
        return error.msg;
    }
  }
}
