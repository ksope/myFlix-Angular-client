// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  //receive movie input data from the view
  @Input() Genre = { Name: '', Description: '' };

  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }
  checkIfFavClicked: boolean = false;
  iconType: string = 'favorite_border';
  searchTerm: string = '';

  searchMovie(): void {
    if (this.searchTerm != '') {
      this.movies = this.movies.filter((movie) =>
        movie.Title.toLowerCase().match(this.searchTerm.toLowerCase())
      );
    } else if (this.searchTerm == '') {
      this.ngOnInit();
    }
  }

  //confirm if movie is already in user's favourite list
  checkIfMovieIsFavourite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  }

  //function to confirm if movie is in user's favourites list
  isFavourite(movieId: any): boolean {
    if (this.fetchApiData.isFavoriteMovie(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  /** change the icon to reflect which toggle function of
   * adding and deleting movie from user's favourite list
   * was triggered
   * */
  changeFavIcon() {
    this.checkIfFavClicked = !this.checkIfFavClicked;
    if (this.checkIfFavClicked) {
      this.iconType = 'favorite';
    } else {
      this.iconType = 'favorite_border';
    }
  }

  /**
   * @returns all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   *
   * @param genreName
   * param data will be passed into the dialog when opened
   */
  getMovieGenre(genre: any): void {
    console.log(genre);

    this.dialog.open(MovieGenreComponent, {
      data: {
        genre,
      },
      width: '280px',
    });
  }

  /**
   *
   * @param directorName
   * param data will be passed into the dialog when opened
   */
  getMovieDirector(director: any): void {
    console.log(director);
    this.dialog.open(MovieDirectorComponent, {
      data: {
        director,
      },
      width: '380px',
    });
  }

  /**
   *
   * @param description
   * param data will be passed into the dialog when opened
   */
  getMovieDescription(details: string): void {
    console.log(details);
    this.dialog.open(MovieDetailsComponent, {
      data: details,
      width: '480px',
    });
  }

  //add movie to list of favourites
  addToFavourites(): void {
    this.changeFavIcon();
  }

  //navigate to profile page
  toProfilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   *
   * log user out of session and delete user
   * data from localstorage
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
   * @param movieId
   * will deletes the movie from the user's favorite movies list
   */
  deleteMovieFromFavourite(movie: any): void {
    if (this.isFavourite(movie._id)) {
      if (confirm("Delete movie from favourite's list?")) {
        this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe({
          next: (response) => {
            console.log(
              'Movie deleted from favourites successfully.',
              response
            );
            alert("movie deleted successfully from favourite's list");
          },
          error: (error) => {
            console.error('Error deleting movie from favourites:', error);
            alert('There is an error');
          },
        });
      }
    } else {
      console.log('Movie not in your Favourites list');
      alert('Movie not in your Favourites list');
    }
  }

  /**
   * @param movieId
   * will set the selected movie as one of the user's favorites
   */
  addMovieToFavourite(movie: any): void {
    if (!this.isFavourite(movie._id)) {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe({
        next: (response) => {
          console.log(response);
          alert("Movie added successfully to Favourite's list");
        },
        error: (error) => console.log(error),
      });
    } else {
      console.log('movie already on favourite list');
      alert('movie already on favourite list');
    }
  }

  /**
   * @param movieId
   * toggle, that is add movie to favourite list if not, if already same button will delete the movie from the user's favourite list
   */
  toggleFavouriteMovies(movie: any): void {
    if (this.isFavourite(movie._id)) {
      this.deleteMovieFromFavourite(movie);
    } else {
      this.addMovieToFavourite(movie);
    }
  }
}
