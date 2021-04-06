import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  passwordValidators = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ];
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^\w+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', this.passwordValidators),
      passwordConfirmation: new FormControl('', this.passwordValidators),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showFormErrors() {
    return (
      this.authForm.get('password').touched &&
      this.authForm.get('passwordConfirmation').touched &&
      this.authForm.errors
    );
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (error) => {
        if (!error.status) {
          this.authForm.setErrors({ requestFailed: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
