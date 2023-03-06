import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtre-prix',
  templateUrl: './filtre-prix.component.html',
  styleUrls: ['./filtre-prix.component.css']
})
export class FiltrePrixComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
 
   
  }



  value = '';
  value1 = 0;

  choosePrice(value:string){

    if (value == '' && this.value1 == 0) {
      this.router.navigateByUrl(`/searchprice/100000000/0`);
    }
    else { 

      console.log(`value=${value}`);
      this.router.navigateByUrl(`/searchprice/${value}/${this.value1}`);

    }
   
  }



 




}

