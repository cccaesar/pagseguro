import { Injectable } from '@angular/core';
declare const PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class GetHashService {

  getHash(){
    
    PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      response.senderHash; //Hash estará disponível nesta variável.
      console.log(response.senderHash)
      return(response.senderHash);
    });
  }

  constructor() { }
}
