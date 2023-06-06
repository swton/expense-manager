import { Component, Input, OnInit } from '@angular/core';
import { ErrorType } from 'src/model/Model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() errorMessage = '';
  @Input() errorType: ErrorType = ErrorType.SUCCESS;

  constructor() { }

  ngOnInit(): void {
  }

  getAlertClass(): string {
    let className = 'alert-success';
    if (this.errorType === ErrorType.WARNING) {
      className = 'alert-warning';
    } else if (this.errorType === ErrorType.DANGER) {
      className = 'alert-danger';
    }

    return className;
  }

  getIconClass(): string {
    let className = 'bi-check-circle-fill';
    if (this.errorType === ErrorType.WARNING) {
      className = 'bi-exclamation-circle-fill';
    } else if (this.errorType === ErrorType.DANGER) {
      className = 'bi-x-circle-fill';
    }

    return className;
  }

}
