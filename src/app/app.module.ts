import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { ConnectComponent } from './components/connect/connect.component';
import { CreateOrgComponent } from './components/create-org/create-org.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import * as fromOrganization from './reducers/organization.reducer';
import { OrganizationEffects } from './effects/organization.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GetOrgComponent } from './components/get-org/get-org.component';
import { DetailOrgComponent } from './components/detail-org/detail-org.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    CreateOrgComponent,
    GetOrgComponent,
    DetailOrgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatRadioModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects, OrganizationEffects]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
