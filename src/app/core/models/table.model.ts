import { PaginationModel } from './pagination.model';
/* Table Object Model */
export class TableModel {
  "name"?: string = '';
  "responsive"?: boolean = true;
  "fixedHeight"?: string = '300px';
  "mainHead"?: TableMainHeadModel[];
  "head"?: TableHeadModel[];
  "body"?: any[] = [];
  "tableFooter" ?: boolean = true;
  "isPagination" ?: boolean = false;
  "paginationData" ?: PaginationModel = new PaginationModel();
  "emptyState" ?: string = '';
  "isDetil" ? : boolean = false
}

export class TableDetailModel {
  "label" ?: string = '';
  "key" ?: string = '';
  "customClass" ?: string = '';
  "isCopy" ?: boolean = false;
}

export class TableMainHeadModel {
  "value"?: string = '';
  "title"?: string = '';
  "startIndex"?: number = 0;
  "span"?: number = 0;
  "used"?: boolean = false;
}

export class TableHeadModel {
  "title"?: string = '';
  "value"?: string = '';
  "visible"?: boolean = true;
  "sortable"?: boolean = true;
  "sortKey" ?: string  = '';
  "actionType" ?: string = '';
  "sortType"?: string = 'desc';
  "sticky"?: string = '';
  "shrink"?: boolean = true;
  "textCenter"?: boolean = true;
  "width"?: string = '';
  "searchable"?: boolean = true;
  "html"?: boolean = false;
  "truncate" ?: boolean = false;
  "toolTip" ?: string = '';
  "copy" ?: boolean = false;
  "itemClass" ?: string = ''
}


