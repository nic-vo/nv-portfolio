## Project Overview

MixDelta caters to avid Spotify users seeking to streamline their playlist management experience. It empowers users to effortlessly compare and merge playlists within their Spotify library, so users with large and varied playlists may benefit.

A lot of the app's functionality centers around integrating Next Auth with MongoDB, facilitating a frictionless authentication process via Spotify's OAuth flow. I wanted to keep as much data off the client as possible, reducing the risk of abuse from unknown browser vulnerabilities and mitigating the transmission overhead associated with conventional cookie-based approaches. By storing access tokens within the database and selectively fetching them as needed, I hope I found the right balance between speed, storage, and security.

Beyond authentication and data management, I fortified the application's resilience with a fairly greedy rate-limiting mechanism on Redis via Upstash. Users can hit the data routes on my app a few times in a given short window before they start hitting 429 repsonses. I was very stingy with the window and the number of requests allowed because I feel like this tool can be used to abuse Spotify's API with a lot of traffic if I'm not careful.

Finally, I implemented data deletion procedures to fulfill user requests for data erasure in compliance with privacy standards and laws regarding storage of users' information for the service. The tool doesn't store a lot of data, so hopefully my approach is sufficient.

## The Auth Problem

I encountered a challenge inherent to the Next Auth framework—its idiosyncratic token management behavior. And its occasionally middling documentation. Basically, I think Next Auth only wants to provide authentication via the gold standard of OAuth and not authorization with the OAuth tokens, which is fine, but I needed the access tokens to make calls to the Spotify API on behalf of users. The issue I found was that after an hour or so with my dev server running, any and all calls to Spotify's API would fail even after logging out and back in. It turns out, Next Auth does NOT by default update the access tokens received from the OAuth providers, at least when using the MongoDB adapter. So I had to devise a workaround to push users to refresh their login early, then hook into the signIn() callback and update the access_tokens in the database. All was well after that.

## Other Challenges and Takeaways

I had to figure out how to structure my back end's fetch requests to Spotify's API because I'm hosting on Vercel's free plan (for now), and Vercel only allows 10 seconds of execution time for API route handlers on this plan. I'm fetching potentially huge track lists for each playlist a user wants to compare, so I can't even start comparing or populating a new playlist until all the initial playlist population is done. And even that doesn't account for if Spotify decides to rate limit the tool. But hopefully my rate limiting solution is enough to deal with that.

I don't know if I'll use Next Auth again given my experience with it. It's very opinionated about being for authentication only, and its defaults don't really allow for a lot of flexibility. I guess auth shouldn't be flexible, but the approach to it could definitely be more modular and less abstracted away.
