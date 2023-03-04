A JavaScript / `React` timer refactored from a React class solution for [freeCodeCamp's front-end certificate] to functional components with hooks. I learned a lot from this project because it had significant interaction between JavaScript and `React`.

### Closures and state

The biggest issue I overcame with this project was dealing with closures in regards to how React component state closure worked with the timeouts that power the timer:
1. When the timer starts, it stores a reference to a timeout that triggers after one second. The timeout's callback reduces the current number of seconds by one, which then...
2. Triggers a `useEffect` that creates another timeout to reduce the time again.
3. When the timer reaches 0 seconds, it resets to the number of seconds designated by the current phase of the timer.
4. Deactivating the timer cancels whatever timeout exists in the component's state.

## Conclusion

Because `React` evaluates state changes at the same time and not synchronously as they're called line by line (I'm not entirely clear on the nitty gritty details of how this works), combined with the post-render nature of `useEffect` execution, I wasn't able to implement a feature I wanted which was skipping the current phase of the timer while it was running, but maybe when I'm more well-read on `React`'s render lifecycle regarding hooks, I'll be able to finagle a solution.



[freeCodeCamp's front-end certificate]: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator
