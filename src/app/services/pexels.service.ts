import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private apiKey = environment.pexelsApiKey;
  private baseUrl = 'https://api.pexels.com/v1';

  constructor(private http: HttpClient) {}

  searchPhotos(query: string, perPage: number = 9): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': this.apiKey
    });

    return this.http.get<PexelsResponse>(`${this.baseUrl}/search`, {
      headers,
      params: {
        query,
        per_page: perPage.toString(),
        orientation: 'square'
      }
    }).pipe(
      map(response => response.photos.map(photo => photo.src.medium))
    );
  }
}
