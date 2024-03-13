export class BookDto{
  constructor(public bookingId: number,
              public userId: number,
              public propertyId : number,
              public startDate: number,
              public endDate: number,
              public rooms:number) {
  }

}
