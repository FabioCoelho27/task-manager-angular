import { AbstractControl, FormGroup } from "@angular/forms";

export class FormUtils{
  public constructor(private form: FormGroup){

  }
  // form errors methods
  public fieldClassForErrorOrSuccess(fieldName: string){
    return {
      "has-error": this.showFieldError(fieldName),
      "has-success": this.getField(fieldName)?.valid
    }
  }
  public iconClassErrorOrSuccess(fieldName: string){
    return {
      "bi bi-x": this.showFieldError(fieldName),
      "bi-check2": this.getField(fieldName)?.valid
    }
  }

  public showFieldError(fieldName: string): boolean{
    let field = this.getField!(fieldName);
    return  field!.invalid && (field!.touched || field!.dirty);
  }

  public getField(fieldName: string){
    return this.form.get(fieldName);
  }
}