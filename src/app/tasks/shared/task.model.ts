export class Task{
  
  constructor(
    public id: number, 
    public title: string,
    public deadline?: Date,
    public description?: string,
    public done?: boolean
  ){ }
}