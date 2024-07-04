import { OnInit } from '@angular/core';
import { IDoctorService } from '../../providers/healthcare/doctor.service-interface';


export abstract class AbstractFindADoctorComponent<T extends IDoctorService> implements OnInit {
  doctorList: any;
  defaultLimit: number = 50;
  constructor(
    public doctorServiceService: T
  ) {}
  
  ngOnInit(): void {
    const ci = this;
    ci.doctorServiceService.getDoctorList(ci.defaultLimit, 1).then(res => {
      ci.doctorList = res['data'];
    });
  }

  abstract openUrl(url: string): void;
  
}
