export class LocationDetail {
  public id : string;
  public $key:string;
  public dateTime : string;
  public HelperId : string;
  public EventDetailsId:string;
  constructor(public latitude : string, public longitude: string) {
  }
}
