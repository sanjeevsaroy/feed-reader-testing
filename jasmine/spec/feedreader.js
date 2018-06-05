/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
         it('each have a defined URL', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            });
         });

        /* Loop through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
         it ('each have a defined name', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            });
         });
    });

    describe('The menu', function() {

        var body,
            menuIcon;

        beforeEach(function() {
            body = $('body');
            menuIcon = $('.menu-icon-link');
        });

        // Ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // Ensures the menu changes visibility when the menu icon is clicked.
        it('becomes visible when the menu icon is clicked and hides when clicked again', function() {
            // Trigger a click event to open the menu
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Trigger another click event to close the menu
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        var feed;

        beforeEach(function(done) {
            feed = $('.feed');
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed completes, there is at least a
         * singe .entry element within the .feed container.
         */
        it('loads at least a single entry', function(done) {
            expect(feed.find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        var feed;
        var initialFeedEntryHeading;
        var newFeedEntryHeading;

        beforeEach(function(done) {
            loadFeed(0, function() {
              initialFeedEntryHeading = $('.entry').first().find('h2').text();
              loadFeed(1, done);
            });
        });

        // Ensures when a new feed is loaded that the content actually changes.
        it('changes the content when loaded', function(done) {
            newFeedEntryHeading = $('.entry').first().find('h2').text();
            expect(newFeedEntryHeading).not.toEqual(initialFeedEntryHeading);
            console.log(initialFeedEntryHeading);
            console.log(newFeedEntryHeading);
            done();
        });
    });
}());
