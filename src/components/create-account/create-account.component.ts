import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuthService } from "../../providers/authentication/auth.service.interface";

export abstract class AbstractCreateAccountComponent<T extends IAuthService, F extends FormBuilder> implements OnInit {    
  @ViewChild('content', { read: TemplateRef }) modal:TemplateRef<any> | undefined;
  message = '';
  createAccountForm: FormGroup;
  roles = ['user', 'admin']; // Define roles for the dropdown

  constructor(public authService: T, public fb: F) {
        
  }

  ngOnInit(): void {
    const ci = this;
    ci.createAccountForm = ci.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  async onSubmit() {
    const ci = this;
    console.log(ci.createAccountForm.value);
    
    const res: Response = await ci.authService.createAccount(ci.createAccountForm.value);      
    console.log(res);
    if(res.status == 200) {
      ci.showModalMessage("Account created");
    }
  }

  abstract showModalMessage(message: string);

  abstract sucessRediect();
}

