export class User {
  public id : string;
  public $key:string;
  public isAccepted : boolean = false;
  public HelperId : string;
  public NeedHelpId : string;
  constructor(public name : string, public phone: number) {

  }
}
