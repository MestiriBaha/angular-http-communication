import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse , HttpContextToken} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable , of} from "rxjs";
import { tap } from "rxjs/operators";
import { HttpCacheService } from "./http-cache.service";

export const CACHEABLE   = new  HttpContextToken(() => true )

@Injectable({
    providedIn : 'root'
}) 

export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheservice : HttpCacheService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.context.get(CACHEABLE))
        {
            return next.handle(req)
        }

//pass along non-cacheable requests : 
if ( req.method !='GET') {
    console.log(`Invalidating cache: ${req.method} ${req.url}`) ; 
    this.cacheservice.invalidatecache() 
    return next.handle(req)
}

//attempt to retrieve a cached response !
const cachedResponse : HttpResponse<any> = this.cacheservice.get(req.url) 

//return cached response 
if(cachedResponse)
{
    console.log(`Returning a cached response ${req.url}`)
    console.log(cachedResponse)
    //of rxjs operator will wrap it into an Observable 
    return of(cachedResponse)
}

//send request to server and add response to cache ! 
return next.handle(req)
    .pipe(
        tap(event => { if (event instanceof HttpResponse) {
            console.log(`Adding Items to the cache  ${req.url}`)
            this.cacheservice.put(req.url , event)

        }})
    )
    }
}