import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-simple',
  templateUrl: './search-simple.component.html',

})
export class SearchSimpleComponent implements OnInit {

 
  value!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }






  

  doSearch(value){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  } 

}
