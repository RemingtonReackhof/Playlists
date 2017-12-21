import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit, OnChanges {
  loaded = true;
  playlist: any;
  id: any;
  tracks: any[];

  displayedColumns = ['name', 'artist'];

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Element>;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlistService.getSelectedPlaylist().subscribe((res) => {
      this.loaded = false;
      this.playlist = res;
      console.log(res);
      this.updatePlaylist();
    });
  }

  ngOnChanges(): void {
    this.loaded = false;
    this.updatePlaylist();
  }

  updatePlaylist() {
    this.playlistService.getTracks(this.playlist.id, this.playlist.owner.id)
      .then((tracks) => {
        console.log(tracks);
        this.tracks = <any[]> tracks;

        for (let i = 0; i < this.tracks.length; ++i) {
          this.tracks[i] = tracks[i].track;
          this.tracks[i].num = i + 1;
          this.tracks[i].artist = this.tracks[i].artists[0].name;
          this.tracks[i].albumName = this.tracks[i].album.name;
          this.tracks[i].duration = this.convertTime(this.tracks[i].duration_ms);
        }
        this.dataSource = new MatTableDataSource<Element>(this.tracks);
        this.loaded = true;
        this.dataSource.sort = this.sort;
      });
  }

  selectRow(row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private convertTime(ms: number): string {
    var m = Math.floor(ms / 1000 / 60);
    var s = Math.floor(ms / 1000 % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
  }
}
