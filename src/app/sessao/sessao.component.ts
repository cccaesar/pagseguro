import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
declare const PagSeguroDirectPayment: any;

import { IdSessaoService } from './id-sessao.service';
import { MetodosPagamentoService } from './metodos-pagamento.service';
import { GetHashService } from './get-hash.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  providers: [IdSessaoService, MetodosPagamentoService, GetHashService, CheckoutService],
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {

  @ViewChild('formasDePagamento') formasDePagamento:ElementRef;
  public idSessao;
  public tiposDePagamento;
  public hash;
  public checkout;

  constructor(public idService: IdSessaoService, public pagamentosService: MetodosPagamentoService, public getHashService: GetHashService,  public checkoutService: CheckoutService ) { 
    this.idSessao = idService.gerarSessao();
    this.tiposDePagamento = pagamentosService.metodosPagamento();
    this.hash = getHashService.getHash();
    this.checkout = checkoutService.processaCheckout(this.hash);
  };

  

  gerarHash(){
    this.hash = this.getHashService.getHash()
    
  }

  public pegarNomes(nome){
    let nomes = [];
    let i:string;
    for(i in nome)
      if(nome[i].displayName != undefined){
        nomes.push(nome[i].displayName);
      }
      
    return nomes;
  }

  formasPagamentoString: string = "";
  iniciar_sessao(){
    let metodosDePagamento;
    let nomes;
    this.idService.gerarSessao();
    this.gerarHash();
    this.checkoutService.processaCheckout(this.hash);
    this.pagamentosService.metodosPagamento().then((resposta:any) => {
      
      metodosDePagamento = resposta
      nomes = this.pegarNomes(metodosDePagamento.paymentMethods.CREDIT_CARD.options);
      this.formasDePagamento.nativeElement.innerHTML = nomes.join("<br>")
      
    });
  }
  
  
  
  /*
      xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
      
        let i1 = this.responseText.indexOf("<id>") + 4;
        let i2 = this.responseText.indexOf("</id>");

        id_sessao = this.responseText.slice(i1, i2);

        console.log(id_sessao);
        PagSeguroDirectPayment.setSessionId(id_sessao);
        //getHash(url)
        PagSeguroDirectPayment.onSenderHashReady(function(response){
          if(response.status == 'error') {
              console.log(response.message);
              return false;
          }
          console.log(response.senderHash);
          hash = response.senderHash
      });
        PagSeguroDirectPayment.getPaymentMethods({
          amount: 500.00,
          success: function(response) {
              // Retorna os meios de pagamento disponíveis.
          },
          error: function(response) {
              // Callback para chamadas que falharam.
          },
          complete: function(response) {
              // Callback para todas chamadas.
          }
      });
        let dados_cartao = (PagSeguroDirectPayment.getBrand({
          cardBin: 411111,
          success: function(response) {
            return(JSON.parse(response));
          },
          error: function(response) {
            alert("Erro na função getBrand");
          },
          complete: function(response) {
            
          }
        }));
        let op_parcelamento = PagSeguroDirectPayment.getInstallments({
          amount: 118.80,
          maxInstallmentNoInterest: 2,
          brand: 'visa',
          success: function(response){
              // Retorna as opções de parcelamento disponíveis
         },
          error: function(response) {
              // callback para chamadas que falharam.
         },
          complete: function(response){
              // Callback para todas chamadas.
         }
        })
        let token2 = PagSeguroDirectPayment.createCardToken
        xhttp2.open("POST", "/v2/transactions?email=" + email + "&token=" + token);
        let boleto = `paymentMode=default
        &paymentMethod=boleto
        &currency=BRL
        &itemId1=0001
        &itemDescription1=Notebook Prata
        &itemAmount1=24300.00
        &itemQuantity1=1
        &installmentQuantity=1
        &installmentValue=2
        &reference=REF1234
        &creditCardToken=${token2}
        &creditCardHolderCPF=09171819053
        &billingAddressStreet=Av. Brig. Faria Lima
        &billingAddressCity=Sao Paulo
        &billingAddressPostalCode=01452002
        &billingAddressNumber=1384
        &senderName=Jose Comprador
        &senderCPF=72962940005
        &senderAreaCode=11
        &senderPhone=56273440
        &senderEmail=comprador@uol.com.br
        &senderHash=${hash}
        &shippingAddressRequired=true
        &shippingAddressComplement=5o andar
        &shippingCost=1.00`;
        xhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
        xhttp2.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200){

            console.log(this.responseText);
          }
        }
        xhttp2.send(boleto);
      
         //{"safeCheckoutResponse":{"status":"success","code":"30000","message":"success","result":{"token":"81e5a9cd979646ecad47ec7c3b65bfab"}}} Callback para todas chamadas.
    
        /*
          PagSeguroDirectPayment.createCardToken({
            cardNumber: '4111111111111111', // Número do cartão de crédito
            brand: 'visa', // Bandeira do cartão
            cvv: '123', // CVV do cartão
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
              &senderCPF=09171819053
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
              &creditCardHolderCPF=09171819053
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

  console.log(metodosPagamento)
  }*/

  ngOnInit(): void {
  }

}
