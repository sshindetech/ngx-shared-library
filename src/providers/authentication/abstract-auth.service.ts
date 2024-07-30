import { Optional } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthService } from './auth.service.interface';
import { NxDemoModuleConfiguration } from '../../config/app-config';


export abstract class AbstractAuthService implements IAuthService {
  static ACCESS_TOKEN = 'access_token';
  public configuration = new NxDemoModuleConfiguration();
  
  constructor( public jwtHelper: JwtHelperService,  @Optional() configuration: NxDemoModuleConfiguration) {
    if (configuration) {
      this.configuration = configuration;
    }    
  }
  
  public isAuthenticated(): boolean {
    const ci = this;
    const token = ci.getAccessToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  public logout() {
    const ci = this;
    ci.removeAccessToken();
  }
  
  public async login(username: string, password: string) {
    const ci = this;    
    const res: Response = await fetch(`${ci.configuration.apiHost}/auth/login`, 
      { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
      });
      
      console.log(res);
      if(res.status == 200) {
        const resJson: any = await res.json()
        const access_token = resJson?.access_token      
        ci.saveAccessToken(access_token);
      }    
    }
    
    public async createAccount(user: any): Promise<Response> {
      const ci = this;    
      return fetch(`${ci.configuration.apiHost}/auth/profile`,  { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...user})
      });
    }

    public abstract getAccessToken(): string | null ;
    
    public abstract saveAccessToken(access_token: string): void ;
    
    public abstract removeAccessToken(): void ;
    
  }