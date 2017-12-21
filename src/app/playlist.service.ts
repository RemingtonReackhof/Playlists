import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';

import {environment} from '../environments/environment';

@Injectable()
export class PlaylistService {
  private playlistsUrl = 'playlists';
  private playlistTracksUrl = 'playlist-tracks';
  private audioFeaturesUrl = 'audio-features';

  constructor(private http: Http) { }

  getPlaylists(): Promise<any[]> {
    return this.http.get(environment.apiUrl + this.playlistsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPlaylist(id: string) {
    return this.getPlaylists()
        .then(playlists => playlists.filter(
          playlist => playlist.id === id)[0]);
  }
  getTracks(id: string, owner: string) {
    return this.http.get(environment.apiUrl + this.playlistTracksUrl + '?playlist=' + id + '&owner=' + owner)
      .toPromise()
      .then((data) => {
        let res = data.json();
        let tracks: string = '';
        for (let i = 0; i < res.length; i += 100) {
          for (let j = 0; i + j < res.length && j < 100; ++j) {
            tracks += res[i + j].track.id + ',';
          }
          this.getAudioFeatures(res, tracks, i);
          tracks = '';
        }
        return res;
      })
      .catch(this.handleError);
  }

  private getAudioFeatures(res: any, ids: string, pos: number) {
    return this.http.get(environment.apiUrl + this.audioFeaturesUrl + '?ids=' + ids)
      .toPromise()
      .then((data) => {
        let tracks = data.json();
        for (let i = 0; i < tracks.audio_features.length; ++i) {
          res[pos + i].audioFeatures = tracks.audio_features[i];
        }
      })
      .catch((err) => {
        console.log(this.handleError);
      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
