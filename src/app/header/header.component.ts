import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  getRole:string;
  userName:string;
  constructor(private router:Router){
    this.getRole = localStorage.getItem("role");
    this.userName = localStorage.getItem('name');
   // console.log( this.getRole);
  }

  logout(){
     localStorage.removeItem("role");
     localStorage.removeItem('name');
     this.router.navigate(['/signin']);
  }
}
