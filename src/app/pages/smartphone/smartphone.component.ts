import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductComponent } from '../../components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SmartphoneContentComponent } from '../../components/smartphone-content/smartphone-content.component';

@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrl: './smartphone.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SmartphoneContentComponent, HeaderComponent, SideMenuComponent, BannerComponent]
})
export class SmartphoneComponent {

}
