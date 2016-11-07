export class Helper{
  public id : string;
  public $key : string;
  public isActive : boolean = false;
  public registerId : string;
  public latitude:string;
  public longitude:string;
  public address:string;

  constructor(public name : string, public phone: number) {
  }
}
