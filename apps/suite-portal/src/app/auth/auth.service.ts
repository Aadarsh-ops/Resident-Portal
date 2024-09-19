import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isLoggedInStatus.asObservable();

  login(id: string, password: string): boolean {
    if (id === 'mockId' && password === 'mockPassword') {
      this.isLoggedInStatus.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInStatus.next(false);
  }

  get isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.isAuthenticated$.subscribe(status => isAuthenticated = status).unsubscribe();
    return isAuthenticated;
  }
}
