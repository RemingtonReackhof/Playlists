import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { PlaylistDetailComponent } from '../playlist-detail/playlist-detail.component';
// import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  displayedColumns = ['name'];

  @ViewChild(MatSort) sort: MatSort;

  selectedPlaylist: any;
  playlists: Array<any> = [];
  dataSource: MatTableDataSource<Element>;
  owner: any;

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getSelectedPlaylist().subscribe((res) => {
      this.selectedPlaylist = res;
      console.log(res);
    });
  }

  ngOnInit() {
    this.playlistService
      .getPlaylists()
      .then((playlists) => {
        this.playlists = playlists;
        this.dataSource = new MatTableDataSource<Element>(this.playlists);
        this.dataSource.sort = this.sort;
        console.log(playlists);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectRow(row) {
    this.playlistService.setSelectedPlaylist(row);
  }
}
