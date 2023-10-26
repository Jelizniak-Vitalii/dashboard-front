import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from './shared/state/facades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isInit$: Observable<boolean> = this.authFacade.isInit$;
  isAuthenticated$: Observable<boolean> = this.authFacade.isAuthenticated$;

  constructor(
    private authFacade: AuthFacade
  ) {}
}
