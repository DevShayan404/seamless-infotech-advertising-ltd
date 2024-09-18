import { CommonModule, Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  scrolled: boolean = false;
  navLinks: string[] = ['Home', 'About Us', 'Services', 'Contact Us'];
  activeLink: number = 0;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.checkScroll();
    const url = this.location.path();
    this.setActiveLinkByUrl(url);
  }

  setActiveLink(i: number, name: string) {
    switch (name) {
      case 'Home':
        this.router.navigate(['']);
        this.activeLink = i;
        break;
      case 'About Us':
        this.router.navigate(['about-us']);
        this.activeLink = i;
        break;
      case 'Services':
        this.router.navigate(['services']);
        this.activeLink = i;
        break;
      case 'Contact Us':
        this.router.navigate(['contact-us']);
        this.activeLink = i;
        break;

      default:
        break;
    }
  }
  setActiveLinkByUrl(url: string) {
    // console.log(url);
    switch (url) {
      case ' ':
        this.activeLink = 0;
        break;
      case '/about-us':
        this.activeLink = 1;
        break;
      case '/services':
        this.activeLink = 2;
        break;
      case '/contact-us':
        this.activeLink = 3;
        break;
      default:
        this.activeLink = 0;
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
