export class BookReqDto {
  constructor(
              public userId: number,
              public propertyId : number,
              public startDate: number,
              public endDate: number,
              public rooms:number) {
  }

}
