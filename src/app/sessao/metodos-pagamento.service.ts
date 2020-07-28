import { Injectable } from '@angular/core';
declare const PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class MetodosPagamentoService {
  
  

    metodosPagamento(){
    //  PagSeguroDirectPayment.getPaymentMethods.bind(this);
      
      return new Promise( function (resolve, reject) { 
        let teste = function(response) {
  
          resolve(response);
        
          return response;
        }
        .bind(this);
        
        PagSeguroDirectPayment.getPaymentMethods({
        
        

        success: teste/*function(response){
          console.log("Método getPaymentMethods foi um sucesso");
          resolve(response);
        }*/,
        error: function(response) {
          reject(response);
            console.log("Erro na no método getPaymentMethods");
            return "";
        },
        complete: function(response) {
            //resolve(response);
            //console.log("Método getPaymentMethods completo");
        }
      })
    });
    }

  constructor() { }
}
