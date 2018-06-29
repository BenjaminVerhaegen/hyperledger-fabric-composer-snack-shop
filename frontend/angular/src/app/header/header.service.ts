import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
  constructor() {}

  getCurrentUSer() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
