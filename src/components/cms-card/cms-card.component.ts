import { Input, OnInit } from '@angular/core'
import { IContentService } from '../../providers/cms/cms.service-interface';

export abstract class AbstractCardComponent<T extends IContentService> implements OnInit {
  @Input()
  public modelName: string | undefined = 'hero-content';
  @Input()
  public modelIndex: number = 0;  
  @Input()
  public styleMode: string | undefined = 'success';
  
  title: string | undefined;
  description: string | undefined;  
  imageUrl: string | undefined;  
  link1Label: string | undefined;
  link1: string | undefined; 
  
  constructor(public cmsService: T) {
    
  }
  
  ngOnInit(): void {
    const ci = this;
    
    if(ci.modelName) {
      ci.cmsService.getContent(ci.modelName!, {limit: 10, offset: ci.modelIndex + 1}).then(res => {
        if(res && res.entries()) {
          const content:any = res[ci.modelIndex].data;
          ci.title = content.title;
          ci.description = content.description;
          ci.link1Label = content.link1Label;
          ci.link1 = content.link1;
          ci.imageUrl = content.image;
        }
      });
    }
  }
}
