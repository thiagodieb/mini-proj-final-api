import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobSchema } from './schemas/job.schema';
import { TagSchema } from './schemas/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { 
            name: 'Job',
            schema: JobSchema
        },
        { 
            name: 'Tag',
            schema: TagSchema
      }
    ])
  ],
  controllers: [
      JobsController
    ],
  providers: [
      JobsService
    ],
})
export class JobsModule {}
