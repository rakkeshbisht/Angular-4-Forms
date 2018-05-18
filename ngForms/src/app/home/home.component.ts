import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { VALID } from '@angular/forms/src/model';
import { Service } from '../services/service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private service : Service){
   service.getLanguages().subscribe(
      data => {
        this.languages = data.languages,
        console.log('success: ', data)
      },
      err => console.log('error : ' , err)
    );
  }

  languages = [];
  model = new Employee('Rakesh', 'Bisht', 'Yes', 'W2', 'default', '2014-10-14');
  hasPrimaryLanguageError = false;
  
  validatePrimaryLanguage (value){
    console.log("lang:" , this.model.primaryLanguage);
    if(value === "default")
      this.hasPrimaryLanguageError = true;
    else 
      this.hasPrimaryLanguageError = false; 

    console.log("hasPrimaryLanguageError:" , this.hasPrimaryLanguageError);
  }

  submitForm(form:NgForm){
    this.validatePrimaryLanguage(this.model.primaryLanguage);

    if(this.hasPrimaryLanguageError)
      return;
    this.service.postEmployee(this.model)
    .subscribe(
      data => console.log('success: ', data),
      err => console.log('error : ' , err)
    );
  }
}
