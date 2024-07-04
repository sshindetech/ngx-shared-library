import { Optional } from '@angular/core';
import { NxDemoModuleConfiguration } from '../../config/app-config';
import { IDoctorService } from './doctor.service-interface';

export abstract class AbstractDoctorService implements IDoctorService {
    public configuration = new NxDemoModuleConfiguration();
    
    constructor(@Optional() configuration: NxDemoModuleConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }    
    }
    
    public async getDoctorList(limit: number, page: number) {
        const ci = this;    
        const searchQuery = new URLSearchParams();
        searchQuery.append('limit', limit.toString());
        searchQuery.append('page', page.toString());
        
        const res: Response = await fetch(`${ci.configuration.apiHost}/healthcare/demo/doctor?${searchQuery.toString()}`, 
        { 
            method: 'GET', 
            headers: { "Content-Type": "application/json" },
        });
        
        if(res.status == 200) {
            const resJson: any = await res.json()  
            return resJson;
        }    
    }
    
}