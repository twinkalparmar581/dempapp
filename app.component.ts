import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {

  title = 'My Microsoft Login- Example';

  constructor(private authService: MsalService) {

  }
  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  login() {
    // this.authService.loginRedirect();

    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  }

  logout() {
    this.authService.logout()
  }
 

} 
