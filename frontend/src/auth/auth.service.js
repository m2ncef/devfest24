import { API_BASE_URL } from '@/config/serverApiConfig';

import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

export const login = async ({ loginData }) => {
  try {
    const response = await fetch(API_BASE_URL + `login?timestamp=${new Date().getTime()}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const signup = async ({ signupData }) => {
  try {
    const response = await fetch(API_BASE_URL + `signup?timestamp=${new Date().getTime()}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(signupData),
    });

    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('auth');
};
