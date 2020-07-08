import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl } from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  angForm: FormGroup;
  constructor(private fb:FormBuilder){
    this.createForm();
  }
  createForm(){
    this.angForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  onClickSubmit(email,password){
    alert('Your Email is:'+email);
  }
  
  ngOnInit(){
    this.buildForm();
  }
  buildForm(){
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    const name = 'JOHN DOE';
    const minPassLength = 4;
    this.angForm = this.fb.group({
      registeredOn: today,
      name: [name.toLowerCase(), Validators.required],
      email: ['john@angular.io', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
        this.validatePassword
      ]]
    });
  }
//Funciones para validar
  validatePassword(control: AbstractControl) {
    const password = control.value;
    let error = null;
    if (!password.includes('$')) {
      error = { ...error, dollar: 'needs a dollar symbol' };
    }
    if (!parseFloat(password[0])) {
      error = { ...error, number: 'must start with a number' };
    }
    return error;
  }
  
  public register() {
    const user = this.angForm.value;
    console.log(user);
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.angForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  title = 'angular13';
}
