import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public transfer: FileTransfer, public file: File, public androidPermissions: AndroidPermissions, public fileOpener: FileOpener) {

  }

  download() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      (result => {
        if(result.hasPermission == false) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        } else {
          const fileTransfer: FileTransferObject = this.transfer.create();

          const uri = "https://object.mycoop.id/middleware-mobile-pulsa/999-BPJS-1552715528738.pdf";
          fileTransfer.download(uri, this.file.dataDirectory + "bukti.pdf").then((res) => {
            console.log('download completed: ' + res.toURL()); 

            this.fileOpener.open(res.toURL(), 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
          }, (error) => {
            console.log("download failed: " + error)
          })
        }
      }),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
  }

}
