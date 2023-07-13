import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadAlertComponent } from './image-upload-alert/image-upload-alert.component';
import { RecaptchaModule} from "ng-recaptcha";


@NgModule({
  declarations: [
    AppComponent,
    ImageUploadAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
