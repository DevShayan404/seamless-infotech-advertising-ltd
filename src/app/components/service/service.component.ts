import { Component } from '@angular/core';
import { SharingService } from '../../core/services/sharing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  serviceList!: any[];
  constructor(private sharingService: SharingService) {}

  ngOnInit(): void {
    this.sharingService.getServiceData().subscribe({
      next: (res) => {
        const response = JSON.stringify(res);
        this.serviceList = JSON.parse(response);
      },
    });
  }
}
