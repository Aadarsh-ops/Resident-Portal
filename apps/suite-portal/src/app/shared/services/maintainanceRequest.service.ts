import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  private apiUrl = 'http://localhost:3333/api/maintenance-requests'; // Correct URL for POST

  constructor(private http: HttpClient) {}

  postRequestForMaintainance(request: MaintenanceRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getMaintenanceRequest(id: string): Observable<MaintenanceRequest> {
    return this.http.get<MaintenanceRequest>(`${this.apiUrl}/${id}`);
  }

  getOpenMaintenanceRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(this.apiUrl);
  }

  closeRequest(requestId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${requestId}/close`, {});
  }


}
