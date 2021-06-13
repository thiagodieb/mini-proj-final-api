import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const JobSchema = new mongoose.Schema({
  title: String,
  id: String,
  description: String,
  permalink: String,
  location: String,
  tags: [String],
  experience: String,
  time: String,
  segment: [String],
  sector: [String],
  creation_date: { type: Date, default: Date.now },
});

JobSchema.plugin(mongoosePaginate);
