export class PropertyDto{
  constructor(public id: number,
              public name: string,
              public city : string,
              public type: string,
              public chargePerNight: number,
              public pictureList: Array<string>) {
  }

}
