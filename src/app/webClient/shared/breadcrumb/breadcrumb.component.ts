import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
@Input() pageName:string="";
@Input() urlImage:string='../../../assets/img/breadcrumb-bg.jpg';
}
