import { GetContentOptions } from '@builder.io/sdk'


export interface IContentService {

     getContent(modelName: string, options?: GetContentOptions);
}