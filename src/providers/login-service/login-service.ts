
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../shared/config';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../shared/user';
import { ToastController, Events } from 'ionic-angular';

interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};



@Injectable()
export class LoginServiceProvider {

  tokenKey: string = 'JWT';
  isAuthenticated: boolean = false;
  username: string;
  authToken: string = undefined;
  constructor(
    public http: HttpClient,
    private toastCtrl: ToastController,
    public event:Events
  ) {
    console.log('Hello LoginServiceProvider Provider');
    this.loadUserCredentials();
  }

  presentToast(myMessage:string) {
    let toast = this.toastCtrl.create({
      message: myMessage,
      showCloseButton: true,
      closeButtonText: 'ok',
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  private loadUserCredentials() {
    let credentials = JSON.parse(localStorage.getItem('TOKEN') || '{}');
    /* this.storage.get(environment.TOKEN_KEY).then(credentials => {
      
    }); */
    if (credentials) {
      if (credentials.token != undefined) {
        this.isAuthenticated = true;
        //this.useCredentials(credentials);

      }
    } else
      console.log('Revisar!! no guarda usuario')
  }
  private storeUserCredentials(credentials) {
    localStorage.setItem('TOKEN', JSON.stringify(credentials));
    this.useCredentials(credentials);
  }
  private useCredentials(credentials) {
    this.isAuthenticated = true;
    this.username = credentials.usuario;
  }
  private destroyUserCredentials() {
    this.username = '';
    this.isAuthenticated = false;
    this.authToken = undefined;
    localStorage.removeItem('TOKEN');
  }
  logout() {

    this.destroyUserCredentials();
  }
  register(userData:Usuario){
    return this.http.post(baseUrl+'users/signup',userData);
  }
  login(userData){
    this.http.post<AuthResponse>(baseUrl+'users/login',userData).subscribe(
      (usuario) => {
        let newCredentials={
          username:userData.username,
          token:usuario.token
        }
        this.event.publish('user:created',newCredentials,Date.now());
        console.log(usuario);
        this.presentToast('Bienvenido: '+userData.username)
        this.storeUserCredentials(newCredentials);
      },
      (error) => { this.presentToast('Login incorrecto'); }
    );
  }
  IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  //aun no se guarda el username.
  getUsername() {
    return this.username;
  };
  logOutFunction() {
    this.destroyUserCredentials();
  };
}
