import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../shared/services/maintainanceRequest.service';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  requests: MaintenanceRequest[];
  displayedColumns: string[] = ['id', 'unitNumber', 'name', 'email', 'serviceType', 'summary', 'details', 'status', 'actions'];

  constructor(private adminService: MaintenanceRequestService) {}

  ngOnInit(): void {
    this.loadOpenRequests();
  }

  loadOpenRequests(): void {
    this.adminService.getOpenMaintenanceRequests().subscribe(
      (data) => {
        this.requests = data;
      },
      (error) => {
        console.error('Error loading open requests:', error);
      }
    );
  }

  closeRequest(requestId: string): void {
    this.adminService.closeRequest(requestId).subscribe(
      () => {
         console.log('Request closed successfully');
         this.loadOpenRequests();
      },
      (error) => {
        console.error('Error closing request:', error);
      }
    );
  }
  
}
