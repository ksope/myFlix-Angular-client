import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};

  favouriteMovies: any[] = [];

  @Input() userData = {
    Name: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'GMT'
      );

      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favouriteMovies = response.filter(
          (movie: { _id: any }) =>
            this.user.FavoriteMovies.indexOf(movie._id) >= 0
        );
      });
    });
  }

  // this will edit the user information
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        // console.log(data);
        this.snackBar.open('User has been updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // deleting user account and return to the welcome screen
  deleteUser(): void {
    if (confirm('Delete account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted successfully', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }

  //navigate to movies page
  toMainPage(): void {
    this.router.navigate(['movies']);
  }
}
