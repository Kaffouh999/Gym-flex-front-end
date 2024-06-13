import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesDiff'
})
export class MinutesDiffPipe implements PipeTransform {
  transform(date1: Date, date2: Date): number {
    let enterDate:Date = new Date(date1);
    let leaveDate:Date = new Date(date2);
    const diffInMs = leaveDate.getTime() - enterDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    return diffInMinutes;
  }
}
