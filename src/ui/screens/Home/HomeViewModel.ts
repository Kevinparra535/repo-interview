import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';

@injectable()
export class HomeViewModel {
  isInitialized = false;

  initializedAt: Date | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initialize() {
    this.isInitialized = true;
    this.initializedAt = new Date();
  }
}
