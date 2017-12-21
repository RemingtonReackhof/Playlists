import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit, OnChanges {
  loaded = false;
  playlist: any;
  id: any;
  data: any[];
  owner: any;

  constructor(private playlistsService: PlaylistService) {}

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.loaded = false;
    this.updatePlaylist();
  }


  private updatePlaylist() {
    this.playlistsService.getPlaylist(this.id)
      .then((playlist) => {
        this.playlist = playlist;
      });
    this.playlistsService.getTracks(this.id, this.owner)
      .then((tracks) => {
        this.data = <any[]> tracks;

        for (let i = 0; i < this.data.length; ++i) {
          this.data[i] = tracks[i].track;
          this.data[i].num = i + 1;
          this.data[i].artist = this.data[i].artists[0].name;
          this.data[i].albumName = this.data[i].album.name;
          this.data[i].duration = this.convertTime(this.data[i].duration_ms);
        }
        // this.onChangeTable(this.config);
      });
  }

  private convertTime(ms: number): string {
    var m = Math.floor(ms / 1000 / 60);
    var s = Math.floor(ms / 1000 % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
  }
}
