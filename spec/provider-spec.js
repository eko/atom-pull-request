'use babel';

import PullRequest from '../lib/pull-request';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Provider', () => {
  describe('when the pull-request:open event is triggered', () => {
    it('return Github provider in case of Github repository', () => {
      // Given
      atom.config.set('pull-request.githubApiToken', 'test-token');

      atom.project.repositories = [{
        destroy() {},
        getOriginURL() { return 'https://github.com/eko/atom-pull-request.git'; },
        getShortHead() { return 'develop'; }
      }];

      // When
      let provider = PullRequest.retrieveProvider();

      // Then
      expect(provider.constructor.name).toEqual('Github');
    });

    it('return Gitlab provider in case of Gitlab repository', () => {
      // Given
      atom.config.set('pull-request.gitlabUrl', 'https://gitlab.test.com');
      atom.config.set('pull-request.gitlabApiToken', 'test-token');

      atom.project.repositories = [{
        destroy() {},
        getOriginURL() { return 'https://gitlab.test.com/eko/atom-pull-request.git'; },
        getShortHead() { return 'develop'; }
      }];

      // When
      let provider = PullRequest.retrieveProvider();

      // Then
      expect(provider.constructor.name).toEqual('Gitlab');
    });
  });
});
