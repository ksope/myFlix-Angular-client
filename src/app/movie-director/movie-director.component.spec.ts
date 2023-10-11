import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectorComponent } from './movie-director.component';

describe('MovieDirectorComponent', () => {
  let component: MovieDirectorComponent;
  let fixture: ComponentFixture<MovieDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDirectorComponent]
    });
    fixture = TestBed.createComponent(MovieDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
