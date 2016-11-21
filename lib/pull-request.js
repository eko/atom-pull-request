'use babel';

import { CompositeDisposable } from 'atom';

import Github from './providers/github';
import Gitlab from './providers/gitlab';

export default {
  subscriptions: null,

  providers: [
      new Github(),
      new Gitlab()
  ],

  config: {
    "gitlabUrl": {
      "description": "If you rely on a private Gitlab server, please type your base URI here (default: https://gitlab.com).",
      "type": "string",
      "default": "https://gitlab.com"
    },
    "gitlabApiToken": {
      "description": "Fill in your Gitlab API token. You can create one under Profile Settings > Access Tokens.",
      "type": "string",
      "default": ""
    },
    "githubApiToken": {
      "description": "Fill in your Github API token. You can create one under Settings > Personal access token.",
      "type": "string",
      "default": ""
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pull-request:open': () => this.open()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  retrieveProvider() {
    for (let key in this.providers) {
      if (this.providers[key].supports() && this.providers[key].prepare()) {
        return this.providers[key];
      }
    }

    return;
  },

  open() {
    let provider = this.retrieveProvider();

    if (null == provider) {
      return;
    }

    provider.handle();
  }
};
