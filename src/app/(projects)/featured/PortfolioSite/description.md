## About

This is my personal portfolio site, representing my first huge foray into a modern framework. I learned a lot about both server-side and front-end development by implementing a number of features. I learned even more rewriting my portfolio the Next 14 App router from the Pages router.

## Transitioning to the App router, 03/2024

Frankly, transitioning to the App router was kind of an eye opener, especially when I first set to work modularizing and refactoring my components. Before migrating, I had a okay-ish working idea of how to structure UI via nested layouts and frequent usage of rendering via props.children, and it wasn't that difficult transitioning to Next.js's fairly opinionated approach to nested UI. But the App router made React's compositional mental model really click for me.

Figuring out how to separate the pages, static content, and interactive components between each `page.tsx` and `layout.tsx`, as well as minimizing use of the `use client` directive was just... a game changer. All the advice about thinking carefully about where to add interactivity to the tree finally made sense in a productive way. Each component function should be as responsible for as little as feasible, and it really hones in on the importance of separating UI from business logic. Previously, it was easy to just throw everything into one large component and call it a day, extracting out smaller things when necessary, but since Next kind of pushes you to really separate UI from content, it makes more sense now.

## Server Components

Restructuring my projects made prop drilling or passing data through `useContext` unnecessary. Couple that with the highly specific server side prop fetching that Next is now capable of with its App router and it's kind of a crazy experience. I haven't had to dive too deep into how the caching works and what not for this project, but to have the fetching colocated with content-dependent components and avoiding contexts or prop drilling is really cool.

## ...Tailwind.

I originally tried semantic CSS with SCSS modules for styling, but when I started making my UI more modular, I discovered why TailwindCSS is so popular.

Components, particularly reusable ones, are already abstractions for functional HTML elements that have very specific CSS. You can write a bunch of CSS in another file, but imagine doing that for a whole component library. That's a lot of switching between a lot of co-located files that might take up more time than just seeing what each component's styling logic is right there in its JSX. Tailwind really demonstrates that semantic class names are a level of abstraction that can potentially get in the way.

Tailwind provides a way to work with CSS that really strives to be low-weight when compiled AND provides a standardized interface that any dev can work with and understand more quickly than having to figure out what each semantic CSS class name does to a component.

That said, while I don't mind the mess of class names in my JSX, I can see how the long class lists might be a turn-off for some devs who really want separation of concerns. And Tailwind's class name chaos can add bulk that doesn't play well with JavaScript functionality if classes must be added and removed, but that's okay. I ended up having a mix of Tailwind for more static components and kept my old semantic SCSS where necessary for more dynamic stuff.
