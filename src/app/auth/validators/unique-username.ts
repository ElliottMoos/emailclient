import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (formControl: FormControl): Observable<ValidationErrors> => {
    const { value } = formControl;

    return this.authService.usernameAvailable(value).pipe(
      map(() => {
        // This particular api returns a 200 status code for available usernames
        // 200 status code always results in map() call so we can just return null here
        return null;
      }),
      catchError((err) => {
        return err.error.username
          ? // TODO: of() is deprecated, refactor to schedule()
            of({ nonUniqueUsername: true })
          : of({ requestFailed: true });
      })
    );
  };
}
