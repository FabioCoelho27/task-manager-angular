import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { FormUtils } from "../shared/form.utils";
import { User } from "../shared/user.model";

@Component({
  selector: "sign-in-form",
  templateUrl: "./sign-in-form.component.html"
})

export class SignInFormComponent{
  public form: FormGroup;
  public formUtils: FormUtils;

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){
    this.setupForm();
    this.formUtils = new FormUtils(this.form);
  }

  public signInUser(){
    console.log("Formulário de SignIn Enviado!");
    console.log(this.form.value)
  }

  public passwordConfirmationValidator(form: FormBuilder){}

  public setupForm(){
    this.form = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null, Validators.required]
    })
  }
}