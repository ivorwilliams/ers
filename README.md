# ers
eBird Recent Sightings

#### Background
[eBird](http://ebird.org) is an online database of bird observations and an
exciting citizen scientist project.  Scientists, researchers and amateur
birdwatchers around the world can contribute their sightings data.

Anyone with a browser can [explore eBird data](http://ebird.org/ebird/explore).  In addition, much of the data is
available via an [API](https://confluence.cornell.edu/display/CLOISAPI/eBird+API+1.1).
The intent of this `ers` project is to display recent sightings information for a specified location, using the APIs provided.

#### Technologies
I implemented this feature for a couple of local (Toronto, Ontario, Canada)
birdwatching sites.
The current implementation uses [jQuery](https://jquery.com) and a lot of
home-grown JavaScript, but I'd like to reimplement it using a more fashionable
toolset.
The current target is [React](https://facebook.github.io/react/), with a
little [Redux](http://redux.js.org) and [Webpack](https://webpack.github.io)
thrown in to be cool.
Watch for edits to this file as JavaScript front-end fashions change!  :-)

#### Care to run it?
Check it out:
```
git clone git@github.com:ivorwilliams/ers.git
cd ers
npm install
```
Bundle it, then run it from the file system:
```
./node_modules/.bin/webpack
open index.html
```
Or, better, using `webpack-dev-server`, because the browser will auto-refresh when there are code changes:
```
npm start
open http://localhost:8080/
```

No, you're right: not much to see ... yet.
