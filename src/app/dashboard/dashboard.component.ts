import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private router : ActivatedRoute) { }
  
  ngOnInit() {
    //it is a resolver , angular will take care of subscribing to the observable and delivering the data via the router 
    /*this.dataService.getAllBooks() 
    .subscribe
    (
      // we have casted the data as the book type ! 
      (data : Book[] | BookTrackerError) => this.allBooks = <Book[]> data , 
      (err : BookTrackerError) => console.log(err.friendlyMessage) ,
      //the arrow function body ! 
      () => console.log("all done getting books")

    )*/
    let resolveddata : Book[] | BookTrackerError = this.router.snapshot.data['resolvedbooks']
    if (resolveddata instanceof (BookTrackerError)) 
    {
      console.log(`Dashboard component error : ${resolveddata.friendlyMessage}`)
    }
    else 
    { this.allBooks = resolveddata}
     this.dataService.getAllReaders().subscribe(
      (data : Reader[] | BookTrackerError) => this.allReaders = <Reader[]> data ,
      (error : BookTrackerError ) => console.log(`${error.friendlyMessage}`) 
      )
     
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }
  

  deleteBook(bookID: number): void {
    this.dataService.DeleteBook(bookID).subscribe(
      (data : void) => { let index : number = this.allBooks.findIndex(book => bookID===book.bookID) ; 
      this.allBooks.splice(index,1)} ,
      (err : any ) => console.log(err) 
    )
  }

  deleteReader(readerID: number): void {
this.dataService.DeleteReader(readerID).subscribe(
  (data : void) => {let index : number = this.allReaders.findIndex(index => index.readerID===readerID) ;   
      this.allReaders.splice(index,1)} ,
      (error : any) => console.log(error))
} 



}
