export class Theater {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public showTime: number,
    public totalSeats: number,
    public bookedSeats: number
  ) {}
}
