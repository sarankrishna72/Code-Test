import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeHolder: string = 'Search user'
  searchItem: string = '';
  @Output() searchEmit = new EventEmitter();
  constructor() { }

  searchKey() {
    this.searchEmit.emit(this.searchItem)
  }

  ngOnInit(): void {
  }

}
