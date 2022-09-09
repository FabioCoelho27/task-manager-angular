import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { Angular2TokenService } from "angular2-token";

import { User } from "./user.model";

@Injectable()

export class AuthService{
  public constructor(private tokenService: Angular2TokenService){}

  public signUp(user: User){
    
  }
  public signIn(uid: string, password:string){
    
  }

  public signOut(){

  }

  public isSignedIn(){
    
  }

  private handleErrors(handleErros: Response) {
    console.log("Salvando o Erro num arquivo de log - Detalhes do erro =>", Error)
    return throwError(Error || 'server Error');
  }
}