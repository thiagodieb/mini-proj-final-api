import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
    name: String,
    permalink: String,
    status: Boolean,
});
