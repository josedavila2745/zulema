import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
 errorMessage = '';
 Email = localStorage.getItem('email');
 current={email: this.Email};
 loginForm: FormGroup;
 img1='assets/imgs/amor-al-projimo.jpg';
 img2='assets/imgs/muchos-afiliados.jpg';
 img3='assets/imgs/productos-angel-brena.jpg';

 constructor(private afAuth: AngularFireAuth,
  private router: Router,
  private fb: FormBuilder,
  private ngZone: NgZone,
  private afiliadosService: FirebaseService ) {
   }



 ngOnInit() :void {
   this.afAuth.user.subscribe(user => {if (user) {this.ngZone.run(() => {this.router.navigate(['/home'])})}})

   this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }


 createUser() {
  this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.username, this.loginForm.value.password)
    .then(() => {this.current.email=this.loginForm.value.username;localStorage.setItem("current", JSON.stringify(this.current));localStorage.setItem("email", this.loginForm.value.username);this.router.navigate(['']);})
    .catch(response => {this.errorMessage = response.message;});
 }

 signIn() {
  this.afAuth.signInWithEmailAndPassword(this.loginForm.value.username, this.loginForm.value.password)
  .then((resp) => {this.Email=resp.user.email;localStorage.setItem("email", this.Email); this.router.navigate(['/home']);})
  .catch(response => {this.errorMessage = response.message;});
}
}

