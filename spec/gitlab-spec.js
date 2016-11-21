'use babel';

import Gitlab from '../lib/providers/gitlab';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Gitlab', () => {
  describe('when initializing', () => {
    it('return Gitlab URI', () => {
      // Given
      atom.config.set('pull-request.gitlabUrl', 'https://gitlab.test.com');

      let gitlab = new Gitlab();

      // When - Then
      expect(gitlab.getUri()).toEqual('https://gitlab.test.com');
    });
  });

  describe('when API token is not filled', () => {
    it('return false', () => {
      // Given
      atom.config.set('pull-request.gitlabApiToken', '');

      let gitlab = new Gitlab();

      // When - Then
      expect(gitlab.prepare()).toEqual(false);
    });
  });

  describe('when API token is given', () => {
    it('return true', () => {
      // Given
      atom.config.set('pull-request.gitlabApiToken', 'test-token');

      let gitlab = new Gitlab();

      // When - Then
      expect(gitlab.prepare()).toEqual(true);
    });
  });
});
