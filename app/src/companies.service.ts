import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().exec();
  }

  async findAllWithStatus(_status:boolean=true): Promise<Company[]> {
    return await this.companyModel.find({status:_status}).exec();
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return await createdCompany.save();
  }

  async getById(id: string): Promise<Company[]> {
    return await this.companyModel.find({_id: id}).exec();
  }

  async update(id: string, createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyModel.findOne({_id: id}).update(createCompanyDto);
  }

  async delete(id: string): Promise<Company> {
    return await this.companyModel.findOne({_id: id}).remove();
  }
}
