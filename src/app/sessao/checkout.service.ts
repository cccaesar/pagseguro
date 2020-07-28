import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  processaCheckout(hash){
    let xhttp = new XMLHttpRequest();
    let email:string = "ccsrrdrgscosta@gmail.com";
    const token:string = "797783BEBAB14DD4884371E3E13C45AE";
    let credenciais = 
    `paymentMode=default
    &paymentMethod=boleto
    &receiverEmail=suporte@lojamodelo.com.br
    &currency=BRL
    &extraAmount=1.00
    &itemId1=0001
    &itemDescription1=Notebook Prata
    &itemAmount1=24300.00
    &itemQuantity1=1
    &notificationURL=https://sualoja.com.br/notifica.html
    &reference=REF1234
    &senderName=Jose Comprador
    &senderCPF=72962940005
    &senderAreaCode=11
    &senderPhone=56273440
    &senderEmail=${email}
    &senderHash=${hash}
    &shippingAddressRequired=true
    &shippingAddressStreet=Av. Brig. Faria Lima
    &shippingAddressNumber=1384
    &shippingAddressComplement=5o andar
    &shippingAddressDistrict=Jardim Paulistano
    &shippingAddressPostalCode=01452002
    &shippingAddressCity=Sao Paulo
    &shippingAddressState=SP
    &shippingAddressCountry=BRA
    &shippingType=1
    &shippingCost=1.00`
    let url = "/v2/transactions?email=" + email + "&token="+ token;
    
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        console.log("Pagamento concluido");
        return(this.responseText);
      }
    }

    xhttp.open("POST", url );
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
    xhttp.send(credenciais);
  }

  constructor() { }
}
