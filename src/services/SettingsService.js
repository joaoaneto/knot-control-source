class SettingsService {
  constructor(isReadyInteractor, setUserInteractor) {
    this.isReadyInteractor = isReadyInteractor;
    this.setUserInteractor = setUserInteractor;
  }

  async isReady() {
    return this.isReadyInteractor.execute();
  }

  async setUser(userCredentials) {
    return this.setUserInteractor.execute(userCredentials);
  }
}

export default SettingsService;
