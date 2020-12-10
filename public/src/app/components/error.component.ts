import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})


export class ErrorComponent implements OnInit {

  data: any = {};
  routeState: any;

  constructor(private router: Router) {

    // to receive data from another component via the router
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.data.errorResult = this.routeState.errorResult ? JSON.parse(this.routeState.errorResult) : '';
      }
    }
    
    console.info (this.data)

   }

  ngOnInit(): void {


  }

}
