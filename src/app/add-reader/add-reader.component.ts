import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/core/data.service';

import { Reader } from "app/models/reader";

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(private dataservice : DataService) { }

  ngOnInit() { }

  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);
    this.dataservice.AddReader(newReader).subscribe(
      (data : Reader) => console.log(data),
      (err : any ) => console.log(err) 
    )
  }

}
