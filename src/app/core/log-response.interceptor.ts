import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpInterceptor , HttpEvent , HttpEventType , HttpHandler , HttpRequest } from "@angular/common/http";
//httpeventtype to check if the http event is a request or a response !! 
@Injectable({
    providedIn : 'root'
}) 
export class LogResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`LogResponseInterceptor : ${req.url}`)
        return next.handle(req)
        .pipe(
            tap(
                event => { 
                    if ( event.type === HttpEventType.Response) {
                        console.log(`the event body is : ${event.body}`)
                    }
                }
            )
        )
    } 

}