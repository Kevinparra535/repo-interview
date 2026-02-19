import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class HomeViewModel {
  isInitialized = false;

  initializedAt: Date | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  run() {
    this.isInitialized = true;
    this.initializedAt = new Date();
  }
}
