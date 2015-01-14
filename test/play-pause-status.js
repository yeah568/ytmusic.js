// Load in dependencies
var Asserter = require('wd/lib/asserters').Asserter;
var expect = require('chai').expect;
var browserUtils = require('./utils/browser');

// Start our tests
describe('A new session with Google Music', function () {
  browserUtils.openMusic({killBrowser: false});
  browserUtils.execute(function getPlayPauseStatus () {
    return !!window.MusicAPI;
  });

  it('has a Google Music API', function () {
    expect(this.result).to.equal(true);
  });

  // TODO: Currently there is no default state, fix that
  it.skip('is not playing any music', function () {
    // Placeholder for linter
  });

  describe('when we are playing music', function () {
    browserUtils.execute(function setupPlaybackWatcher () {
      window.GoogleMusicApp = {
        playbackChanged: function saveMode (mode) {
          window.playbackMode = mode;
        }
      };
    });
    before(function playMusic (done) {
      // Find and click the I'm Feeling Lucky mix
      var browser = this.browser;
      browser.waitForElementByCssSelector('[data-type=imfl]', 2000, 100, function handleElement (err, el) {
        // If there was an error, callback with it
        if (err) {
          return done(err);
        }

        // Otherwise, hover the element
        browser.moveTo(el, 10, 10, function handleHover (err) {
          // If there was an error, callback with it
          if (err) {
            return done(err);
          }

          // Otherwise, click our element
          browser.click(0 /* left click */, done);
        });
      });
    });
    before(function waitForPlaybackStart (done) {
      // Wait for playback slider to move
      // DEV: This is intentionally different from play-pause button which is library behavior
      var sliderValue;
      this.browser.waitFor(new Asserter(function checkSlider (browser, cb) {
        browser.elementById('slider', function handleElement (err, el) {
          // If there was an error, callback with it
          if (err) {
            return cb(err);
          }

          // Otherwise, get the slide value
          browser.getAttribute(el, 'aria-valuenow', function handleValue (err, val) {
            // If there was an error, callback with it
            if (err) {
              return cb(err);
            }

            // Otherwise, if there is a value, it's non-negative (e.g. not zero), and it has changed, return true
            if (val && parseInt(val, 10) && sliderValue !== val) {
              return cb(null, true);
            }

            // Otherwise, save the value and return false
            sliderValue = val;
            return cb(null, false);
          });
        });
      }), 2000, 100, done);
    });
    browserUtils.execute(function getPlaybackState () {
      return window.playbackMode;
    });

    it('lists the music as playing', function () {
      expect(this.result).to.equal(2 /* PLAYING */);
    });

    describe('and pause it', function () {
      before(function pausePlayback (done) {
        // Find and click the I'm Feeling Lucky mix
        var browser = this.browser;
        browser.elementByCssSelector('[data-id=play-pause]', function handleElement (err, el) {
          // If there was an error, callback with it
          if (err) {
            return done(err);
          }

          // Otherwise, click our element
          el.click(done);
        });
      });
      before(function waitForPlaybackPause (done) {
        // Wait for playback slider to stop moving
        var sliderValue;
        this.browser.waitFor(new Asserter(function checkSlider (browser, cb) {
          browser.elementById('slider', function handleElement (err, el) {
            // If there was an error, callback with it
            if (err) {
              return cb(err);
            }

            // Otherwise, get the slide value
            browser.getAttribute(el, 'aria-valuenow', function handleValue (err, val) {
              // If there was an error, callback with it
              if (err) {
                return cb(err);
              }

              // Otherwise, if there is a value, it's non-negative (e.g. not zero), and it has changed, return true
              if (val && parseInt(val, 10) && sliderValue === val) {
                return cb(null, true);
              }

              // Otherwise, save the value and return false
              sliderValue = val;
              return cb(null, false);
            });
          });
        }), 2000, 100, done);
      });
      browserUtils.execute(function getPlaybackState () {
        return window.playbackMode;
      });

      it('lists the music as paused', function () {
        expect(this.result).to.equal(1 /* PAUSED */);
      });

      describe.skip('and when we clear the queue (aka the only way to stop)', function () {
        it('lists the music as stopped', function () {
          // Placeholder for linter
        });
      });
    });
  });
});
