import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Book } from "app/models/book";
import { DataService } from "./data.service";
import { BookTrackerError } from "app/models/bookTrackerError";
import { catchError } from "rxjs/operators";

@Injectable({
 providedIn: 'root'
})

export class BookResolverService implements Resolve<Book[] | BookTrackerError>
{
    constructor(private dataservice : DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Book[] | BookTrackerError>  {
        return this.dataservice.getAllBooks() 
        .pipe(
            catchError(error => of(error))
        )
    }
}