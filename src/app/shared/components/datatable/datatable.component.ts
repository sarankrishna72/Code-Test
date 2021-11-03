import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TableModel, TableHeadModel } from 'src/app/core/models';
import * as _ from 'lodash';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],

})
export class DatatableComponent implements OnChanges {
  @Input() table: TableModel = new TableModel();
  @Input() search: string ;
  @Output() catch = new EventEmitter();
  @Output() pagination = new EventEmitter();
  public selectAll: boolean = false;
  public checkedBodyList = [];
  public availableActions : any = {};
  constructor() { }

  ngOnChanges() {
    /* More Actions & Proirity Action Set  On Changes*/

    console.log(this.table)
  }

  /* Function to get row details on click of the row specific checkbox */
  public rowSelectCTA(rowObj?: any, index?: number){
    this.checkedBodyList = this.table.body.filter(d => d.isChecked !== false);
    this.selectAll = this.checkedBodyList.length == this.table.body.length;
    // this.table.tableFooter = this.checkedBodyList.length > 0 ? true : false;
    this.availableActions = this.table.tableFooter ? this.checkedBodyList[0] : {};
  }

  tableAction(actionType: string) {

  }

  /* Call to Action for Select All*/
  public allSelectCTA(event){
    this.table.body.forEach(body => {
      body.isChecked = event.target.checked ? event.target.checked : false;
    });
    // this.table.tableFooter = event.target.checked;
    this.checkedBodyList = event.target.checked ? this.table.body : [];
    this.availableActions = this.table.tableFooter ? this.checkedBodyList[0] : {};
  }

  /* Card Action Method */
  public cardActionsCTA(actionItem: any, items: object){
    let eventRes = { items: [items], actionItem };
    this.catch.emit(eventRes);
  }

  /* Footer Action Method */
  public footerActionsCTA(actionItem: any){
    let items = [];
    let eventRes = {}
    items = this.table.body.filter(row => row.isChecked == true);
    eventRes = { items, actionItem };
    this.catch.emit(eventRes);
  }

  /* Function for sorting the table data */
  public sortByColumn(tbHeadItem: TableHeadModel, index: number){

    if(tbHeadItem.sortable){
      let newTableBody = this.table.body;
      switch (tbHeadItem.sortType) {
        case 'asc':
          if (tbHeadItem.sortKey) {
            newTableBody = _.orderBy(newTableBody, [`${tbHeadItem.sortKey}`],['asc']);
          } else {
            newTableBody =  _.orderBy(newTableBody, [`${tbHeadItem.value}`],['asc']);
          }
          console.log( tbHeadItem.sortKey)
          this.table.head[index].sortType = 'desc';
        break;
        default:
          console.log( tbHeadItem.sortKey)
          if (tbHeadItem.sortKey) {
            newTableBody = _.orderBy(newTableBody, [`${tbHeadItem.sortKey}`],['desc']);
          } else {
            newTableBody =  _.orderBy(newTableBody, [`${tbHeadItem.value}`],['desc']);
          }
          console.log( newTableBody)
          this.table.head[index].sortType = 'asc';
        break;
      }

      this.table.body = newTableBody;
    }
  }

  paginationEvent(type) {
    let pageObj: any = {
      page_no : 1,
      per_page : this.table.paginationData.per_page
    }
    switch (type) {
      case 'first':
        pageObj.page_no = 1;
        break;
      case 'last':
        pageObj.page_no = this.table.paginationData.total_pages;
        break;
      case 'previous':
        pageObj.page_no = this.table.paginationData.page_no - 1;
        break;
      case 'next':
        pageObj.page_no = this.table.paginationData.page_no + 1;
        break;
      case 'limit':
        pageObj.page_no = 1;
        break;
      default:
        break;
    };
    pageObj.per_page = parseInt(pageObj.per_page)
    this.pagination.emit(pageObj)
  }

}
