import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {} from '@angular/core';
interface Option {
  name: string;
  [key: string]: any;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnChanges {
  myControl = new FormControl('');
  @Input() options: Option[] = [];
  optionStrings: string[] = [];
  filteredOptions!: Observable<string[]>;
  @Output() onChangeEvent = new EventEmitter<string>();

  selectCityValue(value: string | null) {
    if (value != null) {
      this.onChangeEvent.emit(value);
    }
  }
  ngOnChanges() {
    if (this.options != null) {
      this.optionStrings = this.options.map((option) => option.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionStrings.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
