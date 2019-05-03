import { Pipe, PipeTransform } from '@angular/core';
import { Search } from '../models/Search';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {


  transform(array: any[], page_size: number|string, page_number: number): any []{
    if (!array)return []

    if(page_size === 'all'){
      return array
    }

    page_size = page_size || 6
    page_number = page_number || 1

    --page_number

     return array.slice(page_number * Number(page_size) , (page_number + 1) * Number(page_size));
     
  }
  

}
