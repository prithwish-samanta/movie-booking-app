export class Theater {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public showTime: string,
    public totalSeats: number,
    public bookedSeats: number
  ) {}
}
