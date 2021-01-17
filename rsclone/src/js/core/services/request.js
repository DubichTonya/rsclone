import {
  PathSignIn, PathSignUp, PathGetAndPutRequest, PathLogout, PathLogoutAll, EmptyUserData,
} from '../Constants';
import { removeUserAuthorizationData } from './userAuthorizationData';

export class Request {
  // Зарегистрироваться POST
  signUp(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignUp, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => {
            message.innerHTML = 'Sign in';
          }, 2000);
        } else {
          message.innerHTML = 'Registration was successful';
          setTimeout(() => {
            finish();
          }, 2000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch((err) => console.log(err));
  }

  // Войти POST
  signIn(data, message, finish) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(PathSignIn, requestOptions)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          message.innerHTML = 'Fill in the fields correctly.Try again';
          setTimeout(() => {
            message.innerHTML = 'Authorization';
          }, 2000);
        } else {
          message.innerHTML = 'Authorization was successful';
          setTimeout(() => {
            finish();
          }, 2000);
        }
        return response.json();
      }).then((result) => this.setUserDataInStorage(result))
      .catch((err) => { console.log(err); });
  }

  logout() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(PathLogout, requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status >= 400 && response.status < 600) {
          console.log('error');
        } else if (response.status === 200) {
          localStorage.clear();
          localStorage.setItem('isAutorization', 'false');
          localStorage.setItem('statistic', `${JSON.stringify(EmptyUserData)}`);
          removeUserAuthorizationData();
        }
      })
      .catch((err) => console.log(err));
  }

  logoutAll() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(PathLogoutAll, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  // Получить данные клиента GET
  getClientData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  // Получить данные статистики PUT
  putClientData(data, callbackError) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.requestToken}`,
      },
      body: JSON.stringify(data),
    };
    fetch(PathGetAndPutRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch(callbackError());
  }

  setUserDataInStorage(result) {
    localStorage.setItem('token', `${result.token}`);
    localStorage.setItem('name', `${result.user.name}`);
    localStorage.setItem('statistic', `${JSON.stringify(result.user.data)}`);
  }

  setTokenInStorage(token) {
    localStorage.setItem('token', token);
  }
}
