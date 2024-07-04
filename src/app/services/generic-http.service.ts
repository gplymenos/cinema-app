import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { apiUrl } from '../api';

export interface IGenericService {
  fetchData(url: string, errorMessage: string): Observable<Object>;
  createData<T>(url: string, data: T, errorMessage: string): Observable<T>;
}

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService implements IGenericService {
  // private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);

  fetchData<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(apiUrl + url + '?size=100').pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error));
      })
    );
  }

  createData<T>(url: string, data: T) {
    return this.httpClient.put<T>(apiUrl + url, data).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error));
      })
    );
  }
}
