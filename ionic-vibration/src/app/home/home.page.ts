import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private vibration: Vibration
  ) { }

  doVibrationFor(ms) {
    // Vibrate the device for given milliseconds
    // Duration is ignored on iOS and limited to 1 second.
    this.vibration.vibrate(ms);
  }

  vibrateWithPattern(pattern) {
    // Patterns work on Android and Windows only
    this.vibration.vibrate(pattern);
  }

  stopVibration() {
    // Stop any current vibrations immediately
    // Works on Android and Windows only
    this.vibration.vibrate(0);
  }

}
