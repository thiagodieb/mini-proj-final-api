import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { Tag } from './interfaces/tag.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { mong } from 'mongoose-paginate-v2';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Tag') private readonly tagModel: Model<Tag>
    ) {}

  async findAll(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(await this.defineTags(createJobDto));
    return await createdJob.save();
  }

  async getById(id: string): Promise<Job[]> {
    return await this.jobModel.findOne({id: id}).exec();
  }

  async getByTags(tags: string[]): Promise<Job[]> {
    return await this.jobModel.find({tags: { $all: tags }}).exec();
  }

  async update(id: string, createJobDto: CreateJobDto): Promise<Job> {
    return await this.jobModel.findOne({id: id}).update(createJobDto);
  }

  async delete(id: string): Promise<Job> {
    return await this.jobModel.findOne({id: id}).remove();
  }

  async findAllPagined(page: number): Promise<Job[]> {
    const options = {
      page: page,
      limit: 6,
    };
    return await this.jobModel.paginate({},options);
  }

  private async defineTags(createJobDto){
    let tags = await this.tagModel.find({}).exec();
    createJobDto.tags.splice(0, 1);
    tags.forEach(element => {
      let allText = (createJobDto.description.toUpperCase() + ' ' + createJobDto.title.toUpperCase());
      if(allText.search(element.name.toUpperCase()) != -1){
        createJobDto.tags.push(element.name);
      }
    });
    return createJobDto;
  }
}
