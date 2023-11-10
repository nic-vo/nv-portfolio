## About

A JavaScript / `React` drum machine I created for [freeCodeCamp's front-end certificate]. I refactored it from `React` class components to functional components with hooks. The first sample bank comes from [this video] by the musician Flume, who released sounds that he allowed people to include in their own creative works so long as they weren't commercialized. I programmed / processed the rest of the sounds myself in a DAW (FL Studio) before bringing them into the React app.

### Function

This project allowed me to practice some basic DOM accessing / manipulation when it came to triggering the sounds to play. I take advantage of the `useRef` hook to access the sound elements for each pad and play them at will.

I tried to get creative with the styling here, too: I wanted to implement a CSS-only glow effect that emulates actual light from faux buttons / screens. The trick to emulating light semi-realistically is to treat the elements as if they were being viewed through a camera. Cameras store light information in terms of 24 bits per pixel(?), roughly speaking: 8 bits each for a red, blue, and green channel. Bright lights aren't actually captured with a brightness value (at least in this) --they're stored as closer to the 'white' color. As such, I tried to emulate brightness by desaturating colors and bringing them closer closer to white. The resulting look is rough but passable.

### Conclusion

Hopefully I can seamlesslly add sounds to this Drum Machine in the future by taking advantage of server-side prop checking via Next.js. I also think I need to add some event listeners to account for when `<sound>` `src` changes for each pad.



[freeCodeCamp's front-end certificate]: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
[this video]: https://www.youtube.com/watch?v=tJLGq8O4baE
