import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

import * as _ from 'lodash';

@Injectable()
export class ArtistService {

  private artistsUrl = '/artists';
  private artistAlbumsUrl = '/artist-albums';

  constructor(private http: Http) {}

  getArtists(): Promise<any[]> {
    return this.http.get(environment.apiUrl + this.artistsUrl)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
  }

  getArtist(name: string) {
    return this.getArtists()
      .then((artists) => {
        let res: any = {};
        res.artist = artists.filter(artist => artist.name === name)[0];

        // Get artists albums
        this.http.get(this.artistAlbumsUrl + '?artistId=' + res.artist.id)
          .toPromise()
          .then((response) => {
            // Get rid of duplicate albums
            res.albums = _.uniqBy(response.json().body.items, 'name');
            console.log(res);
            return res;
          })
          .catch(this.handleError);
        return res;
      });
  }

  getAlbums(id: string) {
    let res: any = {};
    return this.http.get(this.artistAlbumsUrl + '?artistId=' + id)
      .toPromise()
      .then((response) => {
        // Get rid of duplicate albums
        res.albums = _.filter(_.uniqBy(response.json().body.items, 'name'), 
          function(album: any) {
            // Fuck censorship
            return !(album.name.includes('Edited') || album.name.includes('Clean Version'));
          });
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
