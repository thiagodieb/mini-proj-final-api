import {Controller, Get, Post, Body, Param, Delete, Patch, Res, Response, HttpStatus, Query} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() tag: CreateTagDto, @Res() res) {
    return await this.tagsService.create(tag).then(() => {
      return res.status(HttpStatus.CREATED).json(['Saved with successful']);
    }).catch(error => {
      const errorCode = error.code === 11000 ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.NOT_IMPLEMENTED;
      return res.status(errorCode).json({code: error.code, message: error.message});
    });
  }

  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }
}
