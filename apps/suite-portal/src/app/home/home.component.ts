import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES, RequestStatus } from '@suiteportal/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRequestService } from '../shared/services/maintainanceRequest.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  requestForm: FormGroup;
  serviceTypes = ALL_SERVICE_TYPES;

  constructor(
    private fb: FormBuilder,
    private maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  ngOnInit(): void {
    //
    this.requestForm = this.fb.group({
      unitNumber: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: [''],
    });
  }

  onSubmitButton(): void {
    if (this.requestForm.valid) {
      const request = {
        ...this.requestForm.value,
        status: RequestStatus.InProgress,
      };
      this.maintenanceRequestService
        .postRequestForMaintainance(request)
        .subscribe(
          (data) => {
            console.log('Request submitted successfully:', data);
            this.requestForm.reset();
            alert('Request submitted successfully');
          },
          (error) => {
            console.error('Error submitting request:', error);
          }
        );
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}
