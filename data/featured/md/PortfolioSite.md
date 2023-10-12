## About

This is my personal portfolio site, representing my first huge foray into a modern framework. I learned a lot about both server-side and front-end development by implementing a number of features.

### List of notable features:

1. I built it in `Next.js`. The back-end reads the pages directory and JSON/markdown files to populate the project pages.
2. I used the [markdown project] I've included elsewhere on the site to populate the project pages with descriptions.
3. I used `puppeeteer` in scripts to generate the thumbnails and other image content (only manually, for now).
4. The contact form back-end utilizes `nodemailer` to send out automated emails, and perhaps I'll add a verification step later on to prevent spam (e.g. email verification link or somesuch).
5. A few of the projects that I deemed appropriate to include in this portfolio were written pre-hooks, so including them into the portfolio involved refactoring everything to React Hooks and splitting up monoliths of JavaScript and CSS into more maintainable, single-responsibility components / modules.
6. I also designed components that were more reusable across the entire site. The image carousel you see above, for example, is extracted into its own component; I'm using it for both this project page and the project page for another [featured project]. And potentially more projects to come.

One feature that I'd like to eventually implement is taking advantage of the dynamic routing within Next.js so I don't have to manually create a page for each project based on what components are available in my component directory. However, I think a limitation of webpack or React functionality being hydrated client-side prevents this. For now.

Anyway. Thank you for visiting!

[markdown project]: /other/Markdown
[featured project]: /featured/BlockBuildersGC
