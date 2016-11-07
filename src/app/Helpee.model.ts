export class Helpee {
  public id : string;
  public isActive : boolean = false;
  public registerId : string;
  public $key : string;
  public HomeAddress:string;
  public WorkAddress:string;
  constructor(public name : string, public phone: number) {
  }
}
