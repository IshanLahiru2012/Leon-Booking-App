export class PropertyReqDto{
  constructor(public name: string,
              public city : string,
              public type: string,
              public chargePerNight: number,
              public userId: number,
              public pictureList: FileList) {
  }

}
