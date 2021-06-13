export class CreateJobDto {
    readonly title: string;
    readonly id: string;
    readonly description: string;
    readonly permalink: string;
    readonly location: string;
    readonly tags: string[];
    readonly experience: string;
    readonly time: string;
    readonly segment: string;
    readonly sector: string[];
    readonly creation_date: Date;
  }
