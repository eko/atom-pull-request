'use babel';

import Github from '../lib/providers/github';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Github', () => {
  describe('when initializing', () => {
    it('return Github URI', () => {
      // Given
      let github = new Github();

      // When - Then
      expect(github.getUri()).toEqual('https://github.com');
    });
  });

  describe('when API token is not filled', () => {
    it('return false', () => {
      // Given
      atom.config.set('pull-request.githubApiToken', '');

      let github = new Github();

      // When - Then
      expect(github.prepare()).toEqual(false);
    });
  });

  describe('when API token is given', () => {
    it('return true', () => {
      // Given
      atom.config.set('pull-request.githubApiToken', 'test-token');

      let github = new Github();

      // When - Then
      expect(github.prepare()).toEqual(true);
    });
  });
});
