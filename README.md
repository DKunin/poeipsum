# Poeipsum

Lorem Ipsum build with random words, from Poe's Raven.

# Build

Made with help of [lipsumator](https://github.com/juice49/lipsumator) module.
There is a build step to compile from es2015 to es5, you'll need babel installed globally for that:

      npm i babel -g

Then just run npm build script

      npm run build

To start server:

      node poeipsum5.js

The default port is 1809 (year of Poe's birht), and the main access point for now is /poeipsum. The front part is not yet build. You can also pass optional parameter ?paragraphs=5 to get more text.


That's it)

