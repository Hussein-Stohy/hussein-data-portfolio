import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  portfolioData$: Observable<any> | undefined;
  errorMessage: string | undefined;

  ngOnInit() {
    this.portfolioData$ = this.http.get('/data.json').pipe(
      catchError(error => {
        this.errorMessage = 'Error loading portfolio data: ' + error.message;
        return of(null);
      })
    );
  }
}
