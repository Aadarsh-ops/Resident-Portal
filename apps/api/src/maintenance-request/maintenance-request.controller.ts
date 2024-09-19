import { BadRequestException, Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { MaintenanceRequestDB } from './maintenance-request.dao';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    if(!maintenanceRequest?.status) {
      throw new BadRequestException('Must provide a valid status');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @Put('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id: string,
  ): Promise<MaintenanceRequestDB> {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }

  @Get('/')
  public async getAllMaintenanceRequests(): Promise<MaintenanceRequestDB[]> {
    return await this.maintenanceRequestService.getOpenMaintenanceRequests();
  }



}
