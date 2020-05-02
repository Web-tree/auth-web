import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {catchError, mapTo} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BrowserStorageService} from './browser-storage.service';

@Injectable({providedIn: 'root'})
export class TokenService {
  private tokenName = 'token';

  constructor(private http: HttpClient,
              private storage: BrowserStorageService) {
  }

  tokenExists(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.storage.get(this.tokenName);
  }

  saveToken(token: string) {
    this.storage.set(this.tokenName, token);
  }

  removeToken(): void {
    this.storage.remove('token');
  }

  isTokenValid(): Observable<boolean> {
    return this.http.post(environment.backendUrl + 'checkToken', this.getToken())
      .pipe(
        mapTo(true),
        catchError((err: HttpErrorResponse) => {
          if (err.status !== 401) {
            console.error(err);
          }
          this.removeToken();
          return of(false);
        })
      );
  }
}
