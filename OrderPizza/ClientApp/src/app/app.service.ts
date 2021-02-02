import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitOrder(data) {
    this.observer.next(data);
  }
}
