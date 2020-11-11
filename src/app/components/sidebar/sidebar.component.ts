import { Component, OnInit } from '@angular/core';
import { ChucknorrisService } from 'src/app/services/chucknorris.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ChucknorrisService]
})
export class SidebarComponent implements OnInit {

  public chucknorrisRandom: any;
  private subscription: Subscription;

  constructor(
    private _chucknorrisService: ChucknorrisService
  ) { 
    this.chucknorrisRandom = '';
  }

  ngOnInit() {
    this.execute();
    const source = interval(30000);
    this.subscription = source.subscribe(val => this.execute());
  }

  execute(){
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
