import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpInterceptor , HttpEvent , HttpHandler , HttpRequest } from "@angular/common/http";


@Injectable({
    providedIn : 'root' 
})  
export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Add header interceptor ${req.url}`) ; 
        
        let jsonreq : HttpRequest<any> = req.clone({
            setHeaders : {
                'content-type' : 'application/json'
        }
        }) ; 

        return next.handle(jsonreq) 

}
    
}