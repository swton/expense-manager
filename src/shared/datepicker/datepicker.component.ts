import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface DatePickerData {
  dateFrom: Date,
  dateTo: Date
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit{
  @Output() datePickerVal = new EventEmitter<DatePickerData>();
  @Input() title = '';
  
  fromDate:Date = new Date();
  toDate:Date = new Date();

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.datePickerVal.emit(
      {
        dateFrom: this.fromDate,
        dateTo: this.toDate
      }
    )
  }

}
