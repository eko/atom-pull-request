'use babel';

import PullRequest from '../lib/pull-request';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PullRequest', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pull-request');
  });

  describe('when the pull-request:open event is triggered', () => {
    it('search for the correct provider', () => {
      atom.commands.dispatch(workspaceElement, 'pull-request:open');

      waitsForPromise(() => {
        return activationPromise;
      });
    });
  });
});
