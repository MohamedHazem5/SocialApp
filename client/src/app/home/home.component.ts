import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerModel= false;

  constructor() { }

  ngOnInit(): void {
  }
registerToggle(){
  this.registerModel=!this.registerModel;
  }



  cancelRegisterMode(event: boolean){
    this.registerModel=event;
  }


}
