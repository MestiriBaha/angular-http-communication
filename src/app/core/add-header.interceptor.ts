import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpInterceptor , HttpEvent , HttpHandler , HttpRequest  , HttpContextToken} from "@angular/common/http";

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json') ; 
@Injectable({
    providedIn : 'root' 
})  
export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Add header interceptor ${req.url}`) ; 
        
        let jsonreq : HttpRequest<any> = req.clone({
            setHeaders : {
                'content-type' : req.context.get(CONTENT_TYPE)
        }
        }) ; 

        return next.handle(jsonreq) 

}
    
}