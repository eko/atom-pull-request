# Pull Request (Atom package)

This package allows you to quickly prepare your pull request by driving you directly
on your pull request creation page of your current Git project and by pre-defining source/target branches.

![Package preview](https://raw.githubusercontent.com/eko/atom-pull-request/master/resources/preview.gif)

## Installation

Using the Atom Package Manager:

```
$ apm install activate-power-mode
```

Or Settings ➔ Install ➔ Search for `pull-request`.

## Configuration

### Using Github
1. Go to https://github.com/settings/tokens and create a new API token
2. Open your `config.cson` file
3. Add this snippet (replacing '<your token>' with the token you created):

```json
"pull-request":
  githubApiToken: "<your-token>"
```

### Using Gitlab
1. Go to https://gitlab.com/profile/personal_access_tokens and create a new API token
2. Open your `config.cson` file
3. Add this snippet (replacing '<your token>' with the token you created):
4. Optionally, if you rely on a private Gitlab server, also fill in your base uri.

```json
"pull-request":
  gitlabApiToken: "<your-token>"
  gitlabUrl: "https://gitlab.acme.tld"
```

## Usage

You can use the `ctrl` + `alt` + `p` pre-defined shortcut or just search for `Pull Request: Open` using the palette.

## Contributing

Feel free to contribute on this package, I will be happy to work with you.
