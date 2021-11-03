import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    let val =  value.filter(function(item: any){
      // return item.name.toLowerCase().startsWith(args)
      return item.name ? item.name.toLowerCase().startsWith(args) : item.title.toLowerCase().startsWith(args) 

      // return JSON.stringify(item).toLowerCase().includes(args);
    });
    // let val = value.map((x: any) => x.name.toLowerCase().startsWith(args))
    if(val.length){
      return val;
    } else {
      /* Returning this value to show the `Search Result Not Found` message in UI */
      return [];
    }
  }
}
