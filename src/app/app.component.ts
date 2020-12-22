import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'youplaza';
  logged=false;
  errorMessage = '';
  constructor(private afAuth: AngularFireAuth, private router: Router ) {
  }
  ngOnInit():void{
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener).unsubscribe;
  }
  muser():string {
    let vuser=localStorage.getItem("email");
   return (vuser) ? vuser.substring(0,vuser.indexOf('@')):"";
  }
  logout(): void {
    this.afAuth.signOut().then(() => {localStorage.setItem("email", ""); localStorage.setItem("current", "");this.router.navigate(['/nologgeado']);})
    .catch(response => {this.errorMessage = response.message;});
  }
  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      //console.log('Logged in :)');
      this.logged= true;
    } else {
      //console.log('Logged out :(');
      this.logged= false;
    }
  }
}
