import { Component, Inject, inject } from '@angular/core';
import{ ReactiveFormsModule, FormsModule , FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
    });

    //router = inject(Router);
    router = inject(Router);

    onLogin(){
      const formvalue = this.userForm.value;
      console.log(formvalue);
       
      if(formvalue.username === 'admin' && formvalue.password === 'admin123'){
        console.log('Login successful');
        this.router.navigateByUrl('/dashboard');
      
    }
    else{
      console.log('Login failed');
      alert('Invalid credentials');
    }
  }

}
