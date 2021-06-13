import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel('Tag') private readonly TagModel: Model<Tag>
    ) {}

  async findAll(): Promise<Tag[]> {
    return await this.TagModel.find({},'-raking -_id').exec();
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.TagModel(createTagDto);
    return await createdTag.save();
  }

  async getById(id: string): Promise<Tag[]> {
    return await this.TagModel.findOne({id: id}).exec();
  }

  async update(id: string, createTagDto: CreateTagDto): Promise<Tag> {
    return await this.TagModel.findOne({id: id}).update(createTagDto);
  }

  async delete(id: string): Promise<Tag> {
    return await this.TagModel.findOne({id: id}).remove();
  }
 
}
