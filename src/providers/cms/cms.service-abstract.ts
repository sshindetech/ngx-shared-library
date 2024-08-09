import { GetContentOptions, builder } from '@builder.io/sdk'
import { IContentService } from './cms.service-interface';
import { Optional } from '@angular/core';
import { NxDemoModuleConfiguration } from '../../config/app-config';


export abstract class AbstractContentService implements IContentService {
    
    constructor(@Optional() configuration: NxDemoModuleConfiguration) {
        builder.init(configuration.builderIoApiKey);
    }
    
    public getContent(modelName: string, options?: GetContentOptions) {
        return builder.getAll(modelName, options);
    }
    
    
}