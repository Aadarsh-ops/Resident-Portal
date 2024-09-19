import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MaintenanceRequest, RequestStatus, ServiceType } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintainanceRequest.service';

describe('MaintenanceRequestService', () => {
  let service: MaintenanceRequestService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3333/api/maintenance-requests'; // The API URL used in the service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaintenanceRequestService],
    });
    service = TestBed.inject(MaintenanceRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
   
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to create a maintenance request', () => {
    const mockRequest: MaintenanceRequest = {
        unitNumber: '101',
        summary: 'Leaky faucet',
        status: RequestStatus.InProgress,
        name: 'asfd',
        email: 'sdaf@gmail.com',
        serviceType: ServiceType.Plumbing,
    };
    const mockResponse = { message: 'Request submitted successfully' };

    service.postRequestForMaintainance(mockRequest).subscribe((response) => {
      expect(response.message).toBe('Request submitted successfully');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should send GET request to fetch a single maintenance request by ID', () => {
    const mockRequest: MaintenanceRequest = {
        id: '1',
        unitNumber: '101',
        summary: 'Leaky faucet',
        status: RequestStatus.InProgress,
        name: 'asfd',
        email: 'sdaf@gmail.com',
        serviceType: ServiceType.Plumbing,
    };

    service.getMaintenanceRequest('1').subscribe((request) => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequest);
  });

  it('should send GET request to fetch all open maintenance requests', () => {
    const mockRequests: MaintenanceRequest[] = [
        {
        id: '1',
        unitNumber: '101',
        summary: 'Leaky faucet',
        status: RequestStatus.InProgress,
        name: 'asfd',
        email: 'sdaf@gmail.com',
        serviceType: ServiceType.Plumbing,
    }
    ];

    service.getOpenMaintenanceRequests().subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests).toEqual(mockRequests);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequests); 
  });

  it('should send PUT request to close a maintenance request', () => {
    const mockResponse = { message: 'Request closed successfully' };

    service.closeRequest('1').subscribe((response) => {
      expect(response.message).toBe('Request closed successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/1/close`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse); 
  });

  it('should handle errors on POST request', () => {
    const mockRequest: MaintenanceRequest = {
        id: '1',
        unitNumber: '101',
        summary: 'Leaky faucet',
        status: RequestStatus.InProgress,
        name: 'asfd',
        email: 'sdaf@gmail.com',
        serviceType: ServiceType.Plumbing,
    };
    const mockErrorResponse = { status: 500, statusText: 'Server Error' };

    service.postRequestForMaintainance(mockRequest).subscribe(
      () => fail('Expected an error, but got a success response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(null, mockErrorResponse);
  });
});
