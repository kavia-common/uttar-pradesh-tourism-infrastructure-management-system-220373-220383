import 'zone.js';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const ENABLE_BACKEND = (import.meta as any).env?.VITE_ENABLE_BACKEND === 'true';
const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:8080';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 style="margin:0 0 .5rem 0;">Welcome</h2>
      <p>UPSTDC Infrastructure Management System</p>

      <div style="margin-top: .75rem;">
        <strong>Backend Connectivity</strong>
        <div *ngIf="!backendEnabled" style="color:#64748b">
          Backend disabled. Showing placeholder data.
        </div>
        <div *ngIf="backendEnabled && status==='ok'" style="color:#16a34a">
          Connected to backend at {{ backendUrl }}
        </div>
        <div *ngIf="backendEnabled && status==='error'" style="color:#EF4444">
          Failed to reach backend at {{ backendUrl }}. Using placeholder data.
        </div>
      </div>

      <div style="margin-top: 1rem;">
        <strong>Sample Projects</strong>
        <ul>
          <li *ngFor="let p of projects">
            {{ p.name }} — {{ p.status }}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  backendEnabled = ENABLE_BACKEND;
  backendUrl = BACKEND_URL;
  status: 'unknown' | 'ok' | 'error' = 'unknown';
  projects: Array<{ name: string; status: string }> = [
    { name: 'Visitor Center Ayodhya', status: 'Planned' },
    { name: 'Varanasi Ghat Revamp', status: 'In Progress' },
    { name: 'Agra Wayfinding', status: 'Completed' }
  ];

  ngOnInit(): void {
    const badge = document.getElementById('backend-status');
    if (badge) {
      badge.textContent = `Backend: ${this.backendEnabled ? 'Enabled' : 'Disabled'}`;
    }

    if (!this.backendEnabled) {
      this.status = 'unknown';
      return;
    }

    // Try a lightweight health endpoint; tolerate failure gracefully.
    const url = `${this.backendUrl.replace(/\/+$/, '')}/actuator/health`;
    this.http.get(url, { responseType: 'json' }).subscribe({
      next: () => {
        this.status = 'ok';
      },
      error: () => {
        this.status = 'error';
      }
    });
  }
}

// PUBLIC_INTERFACE
export function bootstrap(): Promise<void> {
  /**
   * Bootstraps the Angular standalone application.
   * Returns a promise resolved when bootstrap completes.
   */
  return bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(HttpClientModule)]
  }).then(() => undefined);
}

bootstrap();
