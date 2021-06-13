import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs.module';
import { CompaniesModule } from './companies.module';
import { TagsModule } from './tags.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/project'),
    JobsModule,
    CompaniesModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
