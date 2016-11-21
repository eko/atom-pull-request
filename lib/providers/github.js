'use babel';

import shell from 'shell';
import Provider from './provider';

export default class Github extends Provider {
  getUri() {
    return 'https://github.com';
  }

  prepare() {
    if (0 == atom.config.get('pull-request.githubApiToken').length) {
      atom.notifications.addWarning("pull-request: Please fill in your Github API token into pull-request's package settings.");

      return false;
    }

    return true;
  }

  supports() {
    return super.supports() && this.getOriginURL().match(/github\.com/i) ? true : false;
  }

  handle() {
      let headers = new Headers();
      headers.append('Authorization', 'token ' + atom.config.get('pull-request.githubApiToken'));

      let context = {method: 'GET', headers: headers};

      let _this = this;

      return fetch('https://api.github.com/user/repos?per_page=100', context)
        .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          return response.json();
        })
        .then(function(repositories) {
            for (let key in repositories) {
              if (_this.getOriginName() == repositories[key].full_name) {
                  return repositories[key];
              }
            }
        })
        .then(function(repository) {
          // Sub-request to obtain all repository information
          fetch('https://api.github.com/repos/' + repository.full_name, context)
            .then(function(response) {
              if (!response.ok) {
                throw Error(response.statusText);
              }

              return response.json();
            })
            .then(function(json) {
              let uri = json.html_url + '/compare/master...' + _this.getShortHead();

              if (undefined != json.parent) {
                uri = json.parent.html_url + '/compare/master...' + json.owner.login + ':' + _this.getShortHead();
              }

              return uri;
            })
            .then(function(uri) {
                shell.openExternal(uri);
            });
        })
        .catch(function(error) {
            atom.notifications.addError('pull-request: An error has occured: ' + error);
        })
      ;
  }
};
