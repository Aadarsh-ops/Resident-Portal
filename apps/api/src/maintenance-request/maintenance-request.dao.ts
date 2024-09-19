import { Injectable } from '@nestjs/common';
import { MaintenanceRequest, RequestStatus } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
      })
      .write()
    return id;
  } catch (error) {
    console.error('Error inserting new request:', error);
    throw new Error('Error inserting new request');
  }

  

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    try {
      const request = this.collection.find({ id }).value();
      if (!request) {
        throw new Error('Request not found');
      }
      return request;
    } catch (error) {
      console.error('Error getting request:', error);
      throw new Error('Error getting request');
    }
  }

  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestDB[]> {
    try {
      return this.collection.filter({ status: RequestStatus.InProgress }).value();
    } catch (error) {
      console.error('Error getting open requests:', error);
      throw new Error('Error getting open requests');
    }
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    try {
      const request = this.collection.find({ id }).assign({ status:  RequestStatus.Complete}).write();
      if (!request) {
        throw new Error('Request not found');
      }
      return request;
    } catch (error) {
      console.error('Error closing request:', error);
      throw new Error('Error closing request');
    }
  }
}
