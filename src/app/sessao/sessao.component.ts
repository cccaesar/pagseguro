import { Component, OnInit } from '@angular/core';
//import * as PagSeguroDirectPayment from '../../assets/js/pagseguro.directpayment.js';
declare const PagSeguroDirectPayment: any;
@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {

  gerarSessao(){

    let xhttp = new XMLHttpRequest();
    let xhttp2 = new XMLHttpRequest();
    let email:string = "ccsrrdrgscosta@gmail.com";
    const token:string = "797783BEBAB14DD4884371E3E13C45AE";
    let url = "https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=" + email + "&token=" + token;
    let id_sessao;
    let hash;

    xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
      
        let i1 = this.responseText.indexOf("<id>") + 4;
        let i2 = this.responseText.indexOf("</id>");

        id_sessao = this.responseText.slice(i1, i2);

        console.log(id_sessao);
        PagSeguroDirectPayment.setSessionId(id_sessao);
        PagSeguroDirectPayment.createCardToken({
          cardNumber: '4111111111111111', // Número do cartão de crédito
          brand: 'visa', // Bandeira do cartão
          cvv: '013', // CVV do cartão
          expirationMonth: '12', // Mês da expiração do cartão
          expirationYear: '2026', // Ano da expiração do cartão, é necessário os 4 dígitos.
          success: function(response) {
            let token2 = response.card.token;
                                //https://ws.sandbox.pagseguro.uol.com.br/v2/transactions
            xhttp2.open("POST", "https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=" + email + "&token=" + token);
            let cred_cartao = `paymentMode=default
            &paymentMethod=creditCard
            &currency=BRL
            &extraAmount=0.00
            &itemId1=0001
            &itemDescription1=Notebook Prata
            &itemAmount1=24300.00
            &itemQuantity1=1
            &notificationURL=https://sualoja.com.br/notificacao.html
            &reference=REF1234
            &senderName=Jose Comprador
            &senderCPF=22111944785
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
            &shippingCost=1.00
            &creditCardToken=${token2}
            &installmentQuantity=1
            &installmentValue=2
            &noInterestInstallmentQuantity=2
            &creditCardHolderName=Jose Comprador
            &creditCardHolderCPF=22111944785
            &creditCardHolderBirthDate=27/10/1987
            &creditCardHolderAreaCode=11
            &creditCardHolderPhone=56273440
            &billingAddressStreet=Av. Brig. Faria Lima
            &billingAddressNumber=1384
            &billingAddressComplement=5o andar
            &billingAddressDistrict=Jardim Paulistano
            &billingAddressPostalCode=01452002
            &billingAddressCity=Sao Paulo
            &billingAddressState=SP
            &billingAddressCountry=BRA`;
            console.log(cred_cartao);
            xhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
            xhttp2.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200){

                console.log(this.responseText);
              }
            }
            xhttp2.send(cred_cartao);
          }
          ,
          error: function(response) {
               
          },
          complete: function(response) {
               //{"safeCheckoutResponse":{"status":"success","code":"30000","message":"success","result":{"token":"81e5a9cd979646ecad47ec7c3b65bfab"}}} Callback para todas chamadas.
          }
       });
		  }
		};

    xhttp.open("POST", url);
    xhttp.send();

    
    
    PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      hash = response.senderHash; 
  });

  console.log(JSON.stringify(hash));
    
    /*let metodosPagamento = PagSeguroDirectPayment.getPaymentMethods({
      amount: 500.00,
      success: function(response) {
        let metodosDePagamento = ["Crédito", "Débito Online", "Boleto"];
        let i = 0; 
        while( i <= 3){

        }
        
      },
      error: function(response) {
          // Callback para chamadas que falharam.
      },
      complete: function(response) {
          // Callback para todas chamadas.
      }
      
  });

  console.log(metodosPagamento)*/
  }

  constructor() { }

  ngOnInit(): void {
  }

}
