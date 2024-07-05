import { OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { IAuthService } from "../../providers/authentication/auth.service.interface";

export abstract class AbstractLoginComponent<T extends IAuthService, F extends FormBuilder> implements OnInit {    
    public loginForm: any;
    
    constructor(public authService: T, public formBuilder: F) {
        
    }
    
    ngOnInit() {
        const ci = this;
        if(ci.authService.isAuthenticated()) {
            ci.sucessRediect();
        }      
        
        ci.loginForm = ci.formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(250),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(250),
            ]),
        });        
    }
    
    async login() {
        const ci = this;
        
        if(ci.loginForm.valid) {
            let username = ci.loginForm.value.username;
            let password = ci.loginForm.value.password;
            
            console.log("Username:", username);
            console.log("Password:", password);
            
            try {
                const res = await ci.authService.login(username ? username: '', password ? password: '');
                if(ci.authService.isAuthenticated()) {
                    ci.sucessRediect();
                } else {
                    console.log('Invalid username or password.');
                    ci.showError();
                }        
            } catch (error) {
                console.log(error);
                ci.showError();
            }
        }
    }
    
    public get username() {
        return this.loginForm.get('username')!;
    }
    
    public get password() {
        return this.loginForm.get('password')!;
    }
    
    abstract sucessRediect(): void;
    
    abstract showError(): void;
}