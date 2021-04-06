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

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SigninResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';

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
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.client
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.client.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.client
      .post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        // Again, if tap() is available, assume signin success
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
