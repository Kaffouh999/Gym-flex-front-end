import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  images:String[]=['../../../assets/img/testimonial/testimonial-1.jpg','../../../assets/img/testimonial/testimonial-1.jpg',
  '../../../assets/img/testimonial/testimonial-1.jpg','../../../assets/img/testimonial/testimonial-1.jpg',
  '../../../assets/img/testimonial/testimonial-1.jpg','../../../assets/img/testimonial/testimonial-1.jpg',];


  carouselOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    dots: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1000,
    autoHeight: false,
    autoplay: true
    };
}
