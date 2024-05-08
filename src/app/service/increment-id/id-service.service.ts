import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageKey = 'uniqueId';

  constructor() { }

  getUniqueId(): number {
    const id = parseInt(localStorage.getItem(this.storageKey) ?? '2', 10);
    return id;
  }

  saveUniqueId(id: number): void {
    localStorage.setItem(this.storageKey, id.toString());
  }
}