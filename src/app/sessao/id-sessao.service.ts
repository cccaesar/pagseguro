import { Injectable } from '@angular/core';

declare const PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class IdSessaoService {

  gerarSessao(){

    let xhttp = new XMLHttpRequest();
    let email:string = "ccsrrdrgscosta@gmail.com";
    const token:string = "797783BEBAB14DD4884371E3E13C45AE";
    let url = "/v2/sessions?email=" + email + "&token=" + token;
    let id_sessao;
    

    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        let i1 = this.responseText.indexOf("<id>") + 4;
        let i2 = this.responseText.indexOf("</id>");

        id_sessao = this.responseText.slice(i1, i2);
        console.log(id_sessao);
        PagSeguroDirectPayment.setSessionId(id_sessao);
        return id_sessao;
      }
    }

    xhttp.open("POST", url);
    xhttp.send();

  }

  constructor() { }
}
