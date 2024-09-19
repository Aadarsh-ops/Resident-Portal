import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    try {
      return await this.maintReqDao.insertNewRequest(maintenanceRequest);
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      throw new Error('Failed to create maintenance request');
    }
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    try {
      return await this.maintReqDao.getMaintenanceRequest(id);
    } catch (error) {
      console.error(`Error fetching maintenance request with ID ${id}:`, error);
      throw new Error('Failed to fetch maintenance request');
    }
  }

  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestDB[]> {
    try {
      return await this.maintReqDao.getOpenMaintenanceRequests();
    } catch (error) {
      console.error('Error fetching open maintenance requests:', error);
      throw new Error('Failed to fetch open maintenance requests');
    }
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    try {
      return await this.maintReqDao.closeMaintenanceRequest(id);
    } catch (error) {
      console.error(`Error closing maintenance request with ID ${id}:`, error);
      throw new Error('Failed to close maintenance request');
    }
  }
}
