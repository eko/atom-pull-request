'use babel';

export default class Provider {
  destroy() {
    this.originalUrl = null;
    this.shortHead = null;
  }

  getOriginURL() {
      return this.originURL;
  }

  getOriginName() {
      const regexp = /[\/:]([a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+)\.git/i;
      let matches = this.getOriginURL().match(regexp);

      return undefined != matches[1] ? matches[1] : null;
  }

  getShortHead() {
      return this.shortHead;
  }

  initialize() {
    let repositories = atom.project.getRepositories();

    if (null == repositories) {
      return;
    }

    let repository = repositories[0];
    this.originURL = repository.getOriginURL();
    this.shortHead = repository.getShortHead();
  }

  supports() {
    try {
      this.initialize();
    } catch (e) {
      atom.notifications.addInfo('pull-request: Unable to detect any Git repository on this project.');

      return false;
    }

    return this.getOriginURL() ? true : false;
  }
};
