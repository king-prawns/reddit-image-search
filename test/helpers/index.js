import { ClientFunction } from 'testcafe';

export const localStorageGet = ClientFunction(key => localStorage.getItem(key));
export const getLocation = ClientFunction(() => document.location.href);
export const scrollBottom = ClientFunction(() => window.scrollTo(0, 10000));
