import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { Oldbook } from 'app/models/Oldbook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
     this.dataService.getBookById(bookID).subscribe(
      
        (data : Book) => this.selectedBook=data , 
        (err : any) => console.log(err),
        () => console.log("operation is completed") 

      
     )
     this.dataService.GetOldBookById(bookID).subscribe(
      (data : Oldbook) => console.log(`old book title : ${data.bookTitle}`)
     )
     
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.UpdateBook(this.selectedBook)
    .subscribe(
      (data : void) =>console.log(`${this.selectedBook.title} updated successfully `) , 
      (err : any ) => console.log(err)
    ) ;
  }
}
