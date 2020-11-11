import { Component, OnInit } from '@angular/core';
import { ChucknorrisService } from 'src/app/services/chucknorris.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ChucknorrisService]
})
export class SidebarComponent implements OnInit {

  public chucknorrisRandom: any;

  constructor(
    private _chucknorrisService: ChucknorrisService
  ) { 
    this.chucknorrisRandom = '';
  }

  ngOnInit() {
    this._chucknorrisService.getJoke().subscribe(
      response => {
        this.chucknorrisRandom =  response.value;
      },
      error => {
        console.log(error);
      }
    );
  }

  

}
