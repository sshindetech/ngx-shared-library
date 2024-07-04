import { GetContentOptions, builder } from '@builder.io/sdk'
import { IContentService } from './cms.service-interface';


export abstract class AbstractContentService implements IContentService {
    
    constructor() {
        builder.init('079f8fd8ba2545feb3619a8140fb4298')
    }
    
    public getContent(modelName: string, options?: GetContentOptions) {
        return builder.getAll(modelName, options);
    }
    
    
}