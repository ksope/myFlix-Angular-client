// src/app/user-login-form.component/user-login-form.component.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  //userData is the input data for the component
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // on login token, userData will be stored in localStorage
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('Username', data.user.Username);
        // Logic for a successful login
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(data, 'OK', {
          duration: 2000,
        });
      },
      (data) => {
        this.snackBar.open(data, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
