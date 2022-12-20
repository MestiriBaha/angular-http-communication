import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  constructor() { }
  private requests : any = { } ;

  //function for adding a new item to the cache  : 
  put(url : string , response : HttpResponse<any> ) : void {
    this.requests[url]=response

  }

  //function to get a request from the cache ! 
  get(url : string ) : HttpResponse<any> | undefined {
    return this.requests[url] 

  }
  //validating the cache , getallbooks will not be the same if we add a new book ! 
  invalidateurl(url : string ) : void { 
    this.requests[url]=undefined 
  }

  invalidatecache() : void {
    this.requests = {} ; 
  }
}
