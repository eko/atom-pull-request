'use babel';

import shell from 'shell';
import Provider from './provider';

export default class Gitlab extends Provider {
  getUri() {
    return atom.config.get('pull-request.gitlabUrl');
  }

  prepare() {
    if (0 == atom.config.get('pull-request.gitlabApiToken').length) {
      atom.notifications.addWarning("pull-request: Please fill in your Gitlab API token into pull-request's package settings.");

      return false;
    }

    return true;
  }

  supports() {
    return super.supports() && this.getOriginURL().match(/gitlab/i) ? true : false;
  }

  handle() {
      let headers = new Headers();
      headers.append('PRIVATE-TOKEN', atom.config.get('pull-request.gitlabApiToken'));

      let context = {method: 'GET', headers: headers};

      let _this = this;

      return fetch(this.getUri() + '/api/v3/projects?search=' + this.getOriginName().split('/')[1], context)
        .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          return response.json();
        })
        .then(function(json) {
          if (undefined == json[0]) {
              return;
          }

          let project = json[0];
          let parameters = {
            'change_branches': true,
            'merge_request[source_branch]': _this.getShortHead(),
            'merge_request[source_project_id]': project.id,
            'merge_request[target_branch]': 'master',
            'merge_request[target_project_id]': project.id,
          };

          if (undefined != project.forked_from_project) {
            parameters['merge_request[target_project_id]'] = project.forked_from_project.id
          }

          let query = [];
          for (let key in parameters) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]));
          }

          return _this.getUri() + '/' + _this.getOriginName() + '/merge_requests/new?' + query.join('&');
        })
        .then(function(uri) {
            shell.openExternal(uri);
        })
        .catch(function(error) {
            atom.notifications.addError('pull-request: An error has occured: ' + error);
        })
      ;
  }
};
