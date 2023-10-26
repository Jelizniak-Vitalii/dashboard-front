import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  readonly isBrowser: boolean;
  readonly isServer: boolean;
  readonly isWorkerApp: boolean;
  readonly isWorkerUi: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
    this.isWorkerApp = isPlatformWorkerApp(this.platformId);
    this.isWorkerUi = isPlatformWorkerUi(this.platformId);
  }
}
