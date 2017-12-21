import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
// import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  selectedPlaylist: any;
  playlists: Array<any> = [];
  user = {
    name: "HELLO"
  };

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getPlaylists(() => {
      // this.onChangeTable(this.config);
    });
  }

  private getPlaylists(next: Function) {
    this.playlistService
      .getPlaylists()
      .then((playlists) => {
        this.playlists = playlists;
        console.log(playlists);
        next();
      })
      .catch(function(error) {
        console.log(error);
        next();
      });
  }

  // public rows: Array<any> = [];
  // public columns: Array<any> = [
    // { title: 'Name', name: 'name', sort: '' },
  // ];

  // public config: any = {
  //   sorting: { columns: this.columns },
  //   filtering: {
  //     filterString: '',
  //     columnNames: ['name']
  //   },
  //   playlist: true
  // };

  // public changeSort(data: any, config: any): any {
  //   if (!config.sorting) {
  //     return data;
  //   }

  //   // let columns = this.config.sorting.columns || [];
  //   // let columnName: string = void 0;
  //   // let sort: string = void 0;

  //   for (let i = 0; i < columns.length; i++) {
  //     if (columns[i].sort !== '' && columns[i].sort !== false) {
  //       columnName = columns[i].name;
  //       sort = columns[i].sort;
  //     }
  //   }
  //   if (!columnName) {
  //     return data;
  //   }

  //   // simple sorting
  //   return data.sort((previous: any, current: any) => {
  //     if (previous[columnName] > current[columnName]) {
  //       return sort === 'desc' ? -1 : 1;
  //     } else if (previous[columnName] < current[columnName]) {
  //       return sort === 'asc' ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }

  // public changeFilter(data: any, config: any): any {
  //   if (!config.filtering) {
  //     return data;
  //   }

  //   let filteredData: Array<any> = data.filter((item: any) => {
  //     return item[config.filtering.columnNames[0]].match(new RegExp(this.config.filtering.filterString, "i"));
  //   });

  //   return filteredData;
  // }

  // public onChangeTable(config: any): any {
  //   if (config.filtering) {
  //     Object.assign(this.config.filtering, config.filtering);
  //   }
  //   if (config.sorting) {
  //     Object.assign(this.config.sorting, config.sorting);
  //   }

  //   let filteredData = this.changeFilter(this.playlists, this.config);
  //   let sortedData = this.changeSort(filteredData, this.config);
  //   this.rows = sortedData;
  // }

  // public onRowSelect(row: any): any {
  //   this.selectedPlaylist = this.playlists[row];
  // }

  // onSelect(playlist: any) {
  //   this.selectedPlaylist = playlist;
  // }

  /* Private functions */

}
