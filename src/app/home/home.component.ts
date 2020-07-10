import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  gerarSessao(){
    
    var xhttp = new XMLHttpRequest();
    let token:string = "797783BEBAB14DD4884371E3E13C45AE";
    let email = "ccsrrdrgscosta@gmail.com";


    let id = "https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email="+email+"&token="+token;

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        let id = JSON.parse(this.responseText);
        alert(id);
      }
    };
    

    xhttp.open("POST", id);
    
    
    
    
  }

  cadastro(login,nome,email,senha,senha2) {
    var resultado = true;
    var xhttp = new XMLHttpRequest();
    let token = "797783BEBAB14DD4884371E3E13C45AE";
    var usuario = JSON.stringify({
    
    
    login: login,
    name:nome,
    email:email,
    password:senha,
    confirma_password:senha2,
    role:"Client",
    Status: "Aprovado",  
    regId: "", 
    status : "Aprovado"

    
    
    });
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText)
      }
    };

    xhttp.open("POST", "https://ws.pagseguro.uol.com.br/v2/sessions?email="+email+"&token="+token);
    xhttp.setRequestHeader("Content-type", "application/json");
    //xhttp.setRequestHeader("Authorization", resposta.token);
    xhttp.send(usuario);
    
    return resultado;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
