import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './user.service';
import { PlaylistService } from './playlist.service';
import { ArtistService } from './artist.service';
import { HttpModule } from '@angular/http';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistDetailComponent,
    PlaylistsComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    // MatTableModule
  ],
  providers: [UserService, PlaylistService, ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }

