import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface City {
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
  @Input() options: City[] = [];
  cityNames: string[] = [];
  filteredOptions!: Observable<string[]>;

  ngOnChanges() {
    if (this.options != null) {
      this.cityNames = this.options.map((city) => city.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityNames.filter((name) =>
      name.toLowerCase().includes(filterValue)
    );
  }
}
