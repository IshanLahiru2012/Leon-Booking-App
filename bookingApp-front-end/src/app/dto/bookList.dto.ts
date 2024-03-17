import {PropertyDto} from "./property.dto";

export class BookListDto{
  constructor(public startDate: Date,
              public endDate: Date,
              public rooms:number) {
  }

}
