# google-music.js [![Build status](https://travis-ci.org/twolfson/google-music.png?branch=master)](https://travis-ci.org/twolfson/google-music)

Browser-side JS library for controlling [Google Music][].

[Google Music]: https://play.google.com/music/

This was built as part of [google-music-webkit][], a [node-webkit][] wrapper around [Google Music][]. It was forked from [radiant-player-mac@v1.3.1][], developed and created by [Sajid Anwar][] and [James Fator][] to make it reusable and well tested.

[google-music-webkit]: https://github.com/twolfson/google-music-webkit
[node-webkit]: https://github.com/rogerwang/node-webkit
[radiant-player-mac@v1.3.1]: https://github.com/kbhomes/radiant-player-mac/tree/v1.3.1
[Sajid Anwar]: https://github.com/kbhomes/
[James Fator]: http://jamesfator.com/

## Getting Started
Install the module with: `npm install google-music`

```js
var googleMusic = require('google-music');
googleMusic(); // 'awesome'
```

## Documentation
_(Coming soon)_

**Untested:**

- toggleVisualization
- getRating
- getSongURL
- setStarRating

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

### Testing
// TODO: Formalize me

```
// Dump cookies via node CLI
/*
node

// Inside of CLI
var browser = require('wd').remote();
browser.init({browserName: 'chrome'}, console.log);
// Wait for browser window to open
browser.get('https://play.google.com/music/listen', console.log);
// Wait for redirect to accounts.google.com
// Manually log in to page
// When you are logged in to Google Music, dump the output of the following into `test/cookies.json`
browser.allCookies(function (err, cookies) { console.log(JSON.stringify(cookies, null, 4))});
*/

// Downloaded music via musopen
// https://musopen.org/music/1333/wolfgang-amadeus-mozart/the-marriage-of-figaro-k-492/
// Credentials: musopen@mt2014.com / password

// Music cannot be uploaded via webdriver instance nor incognito window
// If you don't want to contaminate your personal account, try a new Google account and profile in Chrome

```

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## License
All files were originally licensed at `5ccfa7b3c7bc5231284f8e42c6a2f2e7fe1e1532` under the MIT license. This can be viewed its [`LICENSE.md`][]. It has been renamed to [LICENSE-MIT][] for ease of disambiguity.

[`LICENSE.md`]: https://github.com/twolfson/google-music.js/blob/5ccfa7b3c7bc5231284f8e42c6a2f2e7fe1e1532/LICENSE.md
[LICENSE-MIT]: LICENSE-MIT

After this commit, all alterations made by Todd Wolfson and future contributors are released to the Public Domain under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
