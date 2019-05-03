import { ArrayType } from '@angular/compiler';

export class Project{
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public category: string,
    public year: number,
    public langs: string,
    public image: string,
    public email: string,
    public visibility:string,
    public file: string,
    public assessment: number,
    public NumberOfAssessments: number,
    public TotalAssessments: number,
    public VotedUser:Array<string>,
  ){}
}
