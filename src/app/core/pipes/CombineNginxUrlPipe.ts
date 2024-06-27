import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'combineNginxUrl'
})
export class CombineNginxUrlPipe implements PipeTransform {

  transform(profilePicture: string): string {
    const baseUrl = environment.NGINX_URL; // Use the base URL from the environment
    const timeStamp = new Date().getTime();
    return `${baseUrl}/${profilePicture}?t=${timeStamp}`;
  }

}

@NgModule({
  declarations: [CombineNginxUrlPipe], // Declare the pipe in the NgModule
  exports: [CombineNginxUrlPipe] // Export the pipe
})
export class CombineNginxUrlPipeModule { }