## About

**Fun fact: I created the descriptions for all of the projects on this site with this markdown previewer (technically I could've just written markdown files, but it was a learning experience nonetheless).**

Originally, I created this project for [freeCodeCamp's front-end certificate]. But even though the other projects I wrote for that certificate may have been more complex regarding working with React, this one has proved to be most useful. I learned a lot from this project both when I initially created it and when I transferred it over to this portfolio site.

## Some backstory

While I was creating this Markdown previewer, I managed to pass all but one of the tests in freeCodeCamp's testing suite. From what I could see, my solution explicitly gave the solution to that test, yet the test refused to pass. So I [posted to the freeCodeCamp forum] to see if someone could figure out the issue.

The assignment required the [`marked`] library to parse markdown strings to HTML. It turns out that, while I was programming my solution, the `marked` devs had updated the library from `3.x` to `4.x` (major breaking release) right before I submitted the assignment. I had imported and implemented the latest (i.e. `4.x`) version of `marked` whereas the freeCodeCamp's tests were written for `3.x`.

The freeCodeCamp team member indicated they would work on fixing the tests and recommended a solution for anyone else who had the problem. My forum post was indicated as the solution for several other people who were having the same problem.

In short, I learned a lot about semantic versioning that day, and how much front-end development changes in a short period of time.

## Transferring the project

The project was decent as it was when I submitted it for the freeCodeCamp certificate, but I needed to implement a few more features for it to fit my own usage. I learned how to use the Blob API and URL API to allow users to download their markdown files if they like how it displays in the preview pane.



[freeCodeCamp's front-end certificate]: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer
[posted to the freeCodeCamp forum]: https://forum.freecodecamp.org/t/markdown-previewer-solution-fails-tests-5-and-6-despite-functioning-as-intended/
[`marked`]: https://marked.js.org/
