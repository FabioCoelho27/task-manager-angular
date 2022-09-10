import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

import { catchError, Observable, throwError } from "rxjs";

import { User } from "./user.model";

@Injectable()

export class AuthService{

  public constructor(private tokenService: AuthService){}
  

  public signUp(user: User){
    return this.tokenService.registerAccount(user as any)
    .pipe(catchError(this.handleErrors))
  }
  public signIn(uid: string, password:string){

  }

  public signOut(){

  }

  public userSignedIn(uid: string, password: string){
    
  }

  private handleErrors(handleErros: Response) {
    console.log("Salvando o Erro num arquivo de log - Detalhes do erro =>", Error)
    return throwError(Error || 'server Error');
  }
}
