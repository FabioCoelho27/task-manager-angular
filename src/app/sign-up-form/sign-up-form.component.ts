import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { FormUtils } from "../shared/form.utils";
import { User } from "../shared/user.model";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent{
  public form: FormGroup;
  public formUtils: FormUtils

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, router:Router){
    this.form = this.formBuilder.group({
      name:[null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(6)]],
      passwordConfirmation:[null, Validators.required]
      
    },
    
    )
    this.formUtils = new FormUtils(this.form)
  }

  public signUpUser(){
    console.log("Formulário de SignUp enviado!");
    console.log(this.form.value)
  }
}