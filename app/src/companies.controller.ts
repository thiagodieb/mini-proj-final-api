import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    await this.companiesService.create(createCompanyDto).then(()=>{
      return 'Saved with successful';
    }).catch(error => {
      return `Error[${error.code}]: ${error.message}`;
    });
  }

  @Get()
  async findAllWithStatusTrue(): Promise<Company[]> {
    return this.companiesService.findAllWithStatus();
  }

  @Get('status/:status')
  async findAllWithStatus(@Param() params): Promise<Company[]> {
    return this.companiesService.findAllWithStatus(params.status);
  }

  @Get(':id')
  async getById(@Param() params): Promise<Company[]> {
    return this.companiesService.getById(params.id);
  }

  @Patch(':id')
  async update(@Body() updateCompanyDto, @Param() params): Promise<Company> {
    return this.companiesService.update(params.id, updateCompanyDto);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return this.companiesService.delete(params.id);
  }
}
