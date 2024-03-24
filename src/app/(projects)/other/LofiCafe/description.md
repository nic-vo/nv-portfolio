## About

A client requested a prototype of a mindfulness app that can be enjoyed either passively or actively. Users can keep the app open in a tab in the background to enjoy an incrementally refreshed set of pre-selected music streams or view the app to enjoy aesthetic views on top of the music.

I used Next.js for this project to allow for incremental regeneration of the data fed to each player. Keeping the data fetching off the React components sent to the client was my objective in order to obfuscate where I use the relevant API keys. I set up a cron job to hit an API route to trigger the incremental regeneration. I also obfuscated the API route as a simple deterrent to try to wave off malicious actors who'd want to really run up my YouTube API key usage.

Regarding the actual client-side React app: It was definitely a challenge to minimize re-renders / control stateful behavior for the YouTube player. The iFrame's JavaScript API allows for imperative control of the player, but the player also has its own internal state that updates pretty frequently and is a blocking condition for some of the functionality I needed. So I ended up simplifying play and error states to simple booleans that trigger a few side effects on the player object... and most of the time it obeys.
