import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);
  constructor(private client: HttpClient) {}

  usernameAvailable(username: string) {
    return this.client.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.client
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        // If tap() is available, assume signup success
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
}
