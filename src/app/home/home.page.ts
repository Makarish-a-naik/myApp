import { Component, OnInit } from '@angular/core';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  volume = 15;
  maxVolume = 100;
  inital = {
    time: 10,
    secondsCounter: 0,
  };

  minutes = this.inital.time;
  secondsCounter = this.inital.secondsCounter;
  minutesCounter = this.inital.time;
  interval: any;
  constructor(
    public audioman: AudioManagement) {

  }
  ngOnInit() {
    this.getVolume();
  }


  getVolume() {
    this.audioman.getVolume(AudioManagement.VolumeType.MUSIC)
      .then((value) => {
        console.log('Volume' + value.volume);
        this.volume = value.volume;
      })
      .catch((reason) => {
        console.log(reason);
      });
    this.audioman.getMaxVolume(AudioManagement.VolumeType.MUSIC)
      .then((value) => {
        console.log('Volume' + value.maxVolume);
        this.maxVolume = value.maxVolume;
      })
      .catch((reason) => {
        console.log(reason);
      });

  }
  increase() {
    if (this.volume < this.maxVolume) {
      this.audioman.setVolume(AudioManagement.VolumeType.MUSIC, this.volume + 1).then(result => {
        this.volume += 1;
      });
    }

    // Example

  }
  decrease() {
    this.audioman.getVolume(AudioManagement.VolumeType.MUSIC)
      .then((value) => {
        console.log('Volume' + value.volume);
        this.volume = value.volume;
      })
      .catch((reason) => {
        console.log(reason);
      });
    if (this.volume > 0) {
      this.audioman.setVolume(AudioManagement.VolumeType.MUSIC, this.volume - 1).then(result => {
        this.volume -= 1;
      });
    }
  }
  setTimer() {

    this.getVolume();
    let seconds = this.minutes * 60;
    this.minutesCounter = this.minutes;
    this.minutesCounter--;

    const oneStep = Math.floor(seconds / this.volume);
    console.log('onestep' + oneStep);
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      seconds--;
      if (seconds % oneStep === 0) {
        this.decrease();
      }
      this.secondsCounter = Math.floor((seconds % (1 * 60)) / 1);
      if (this.secondsCounter === 0) {
        this.minutesCounter--;
      }

      if (seconds <= 0 || this.volume === 0) {
        this.stop();
        return '';
      }


    }, 1000);
  }



  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.secondsCounter = this.inital.secondsCounter;
      this.minutesCounter = this.minutes;

    }
  }
}
