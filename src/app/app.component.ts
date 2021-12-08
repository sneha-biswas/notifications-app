import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(update : SwUpdate, push : SwPush, snackbar : MatSnackBar) {

    update.available.subscribe(update => {
      console.log("available");
      const snack = snackbar.open("Update available", "Reload");

      snack.onAction().subscribe( x => {
          window.location.reload();
      });
    });

    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });

    const key = 'BCX-kxivwc9mQZpnF0cMOHdauP1bpBr4tPdwhbG-Ma9ANoonlgmPbuNZPv6ZbbsTD-Fyx7h6p7QrZXLqV3ng-Rw';
    push.requestSubscription({serverPublicKey : key}).then(pushsubs => {
        console.log(pushsubs.toJSON());  
    })
  }
  title = 'notifications-app';

  
}
