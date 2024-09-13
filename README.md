# HEX to Tailwind

A small web app that converts your HEX code to the closest color in the Tailwind color palette.
Built with Astro and React. [Site](https://hextotailwind.com) is ranked 2nd on Google search results and 1st on Bing.
View the site traffic analytics [here](https://um.app.taralys.com/share/9lrPut4XEF1miVx3/hextotailwind.com).

## Requirements

- Node v20
- [Umami](https://umami.is/) for analytics
- [Web3Forms](https://web3forms.com/) for feedback form submissions
- hextotailwind.com domain

## Notes

The [colors.ts](./src/utils/colors.ts) file holds the HEX to Tailwind algorithm. See
the [How does it work?](https://hextotailwind.com/) section for what the algorithm does.

The project uses Nano Stores to [share state](https://docs.astro.build/en/recipes/sharing-state-islands/)
between React components. With this, the site can pass URL path attributes to the components without
wrapping it entirely in React.

## TODO

- add more content on the h1 / open-graph titles for better SEO
- Google shows the content instead of metadata; add `data-nosnippet` attribute for
  dynamic section to avoid it being shown in preview
- support older Tailwind versions
- support 4-character (or other format) HEX codes
- add contrast between background and the 2 rendered colors

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
