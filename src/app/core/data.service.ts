import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map , tap } from 'rxjs/operators'

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Oldbook } from 'app/models/Oldbook';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // we are injecting the httpclient into our service constructor ! 
  // the way of anguar to inject dependancy is a little bit easier and different than .NET ! 

  constructor(private http : HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
  
    
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log("getting all the books from the server ") ;
    return this.http.get<Book[]>('/api/books') ;
  }

  getBookById(id: number): Observable<Book> {
    //configure the HttpHeader ! 
    // we could in place of addding a variable , just instanciate the class directly in the headers tag !! 
    let getHeader : HttpHeaders =  new HttpHeaders({
      'Accept' : 'application/json' , 
      'Authorization' : 'my-token'
    }) ;
    return this.http.get<Book>(`/api/books/${id}`, {headers : getHeader})  }  

    GetOldBookById(id : number) : Observable<Oldbook> {
      return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => <Oldbook> {
          bookTitle : b.title,
          year :  b.publicationYear
        }),
        tap(classicbook => console.log(classicbook))
      )
    }
}
