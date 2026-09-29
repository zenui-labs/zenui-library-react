<br />
<p align="center">
  <a href="https://reactui.zenui.net">
    <img src="https://i.ibb.co.com/0BZfPq6/darklogo.png" alt="ZenUI Library React" width="150" />
  </a>
</p>

<h1 align="center">ZenUI Library React</h1>

<p align="center">
<a href="https://github.com/zenui-labs/zenui-library-react" target="__blank"><img alt="release date" src="https://img.shields.io/github/release-date/zenui-labs/zenui-library-react"></a>
<a href="https://github.com/zenui-labs/zenui-library-react" target="__blank"><img alt="commits" src="https://img.shields.io/github/commit-activity/w/zenui-labs/zenui-library-react"></a>
<a href="https://github.com/zenui-labs/zenui-library-react" target="__blank"><img alt="Contributors" src="https://img.shields.io/github/contributors/zenui-labs/zenui-library-react"></a>
<a href="https://github.com/zenui-labs/zenui-library-react" target="__blank"><img alt="stars" src="https://img.shields.io/github/stars/zenui-labs/zenui-library-react"></a>
</p>

<p align="center">
Free, open source React components built with Tailwind CSS.<br>
Copy a component into your project, pass it your data, and ship.
</p>

<p align="center">
<a href="https://reactui.zenui.net"><b>reactui.zenui.net</b></a>
&nbsp;·&nbsp;
<a href="https://reactui.zenui.net/docs/installation">Installation</a>
&nbsp;·&nbsp;
<a href="https://reactui.zenui.net/docs/whats-new">What's new in v4</a>
</p>

![cover](https://i.ibb.co.com/JWX1Bv4W/zenui-library-banner.png)

## ZenUI v4

v4 rebuilds the library around reusable, typed components.

- **Reusable components.** Every example comes in two files: the component, with typed props and no demo data, and a
  short usage file that shows which props to pass. Paste the component once and give it your own data.
- **TypeScript first, JavaScript on request.** Every example is written in TypeScript. Switch any code block to JS to get
  the same component with the types removed.
- **600+ examples on 120+ pages** of components, animations and blocks, from inputs and tables to pricing sections,
  dashboards and animated charts.
- **Responsive testing.** Open any preview full screen and drag its edges, or jump to phone, tablet and desktop widths.
- **Light and dark in every preview.** Switch one preview between auto, light and dark, change its background, or
  replay its animation.
- **A redesigned site**, docs and tools, with dark as the default theme.

Components copied from v3 keep working, so there is nothing to migrate. Older versions stay online at
[v3.reactui.zenui.net](https://v3.reactui.zenui.net) and [v2.reactui.zenui.net](https://v2.reactui.zenui.net).

## Using a component

### 1. Set up your project

ZenUI is not a package. You need a React 18 project with Tailwind CSS v3, plus the two libraries most examples use:

```bash
npm install framer-motion react-icons
```

A few examples use another package, and their page says so at the top (for example the slider needs `swiper`).

For dark mode, set `darkMode: "class"` in `tailwind.config.js` and toggle a `dark` class on `<html>`. If your project is
light only, turn off **Copy with dark:** above the code and the `dark:` classes are left out.

### 2. Copy the component

Open a page on [reactui.zenui.net](https://reactui.zenui.net), switch an example to **Code**, and copy the first file into
your project, for example `src/components/ui/KpiCards.tsx`. Pick **TS** or **JS** above the code first.

### 3. Pass your data

The second tab, **Usage.tsx**, shows how to use it:

```tsx
import {KpiCards, type Kpi} from "./components/ui/KpiCards";

const kpis: Kpi[] = [
    {label: "Monthly recurring revenue", value: "$84,120", change: 12.4, series: [52, 54, 58, 61, 64, 68, 71, 76]},
    {label: "Churn rate", value: "1.8%", change: -0.6, lowerIsBetter: true, series: [3.1, 2.9, 2.6, 2.4, 2.2, 2, 1.9, 1.8]},
];

export default function Dashboard() {
    return <KpiCards items={kpis}/>;
}
```

Components follow the same conventions:

- Data is passed in through required props, typed with exported interfaces such as `Kpi`, `Plan` or `Feature`.
- Headings, labels and captions have defaults you can override.
- State a parent may care about (the selected tab, a range, an open drawer) can be controlled with `value` and
  `onChange`, or left to the component with `defaultValue`.
- User actions have callbacks such as `onSelect` or `onSubmit`.
- The root element accepts `className`.
- Useful parts are exported on their own, for example a single card from a card grid.

Everything else is plain Tailwind CSS, so you can change any class after you paste it. In Next.js App Router, add
`"use client"` to the top of components that use state or effects.

## What's in the library

**Components.** Inputs, buttons, navigation, overlays, feedback, data display, charts, cards, e-commerce and more.

**Animations.** Text effects, scroll animations, cursor effects, tilt and flip cards, docks, animated beams, charts,
number tickers and micro-interactions, built with Framer Motion. They respect reduced motion settings.

**Blocks.** Hero, feature, pricing, FAQ, testimonial, team, blog, CTA and footer sections, sign in and sign up screens,
dashboards, checkout pages and more.

**Tools.** ShortKey (keyboard shortcut handlers), color palette and opacity steps, color from image, 400+ SVG icons,
Config AI (a Tailwind CSS theme from a description) and Semantic TagMaster.

**Templates and resources.** Website templates and a list of programming resources.

## Working on the site

Clone and run it:

```bash
git clone https://github.com/zenui-labs/zenui-library-react.git
cd zenui-library-react
npm install
npm run dev
```

The site is written in TypeScript with Vite, React 18 and Tailwind CSS v3.

| Command                                    | What it does                                                                               |
|--------------------------------------------|--------------------------------------------------------------------------------------------|
| `npm run dev`                              | Start the dev server.                                                                      |
| `npm run build`                            | Production build.                                                                          |
| `npm run preview`                          | Serve the production build locally.                                                        |
| `npm run typecheck`                        | Type-check the whole project with `tsc`.                                                   |
| `node scripts/typecheck-dir.mjs <folder>`  | Type-check one folder and what it imports. Faster while you work.                          |
| `node scripts/check-snippets.mjs [folder]` | Compile every copyable code example in strict TypeScript, as if pasted into a new project. |

### Adding examples

Component, animation and block pages live in `src/Examples/<components|animations|blocks>/<slug>/`:

- `<Name>.tsx` is the reusable component: named exports, typed props, no demo data.
- `<Name>.example.tsx` is the usage. It imports the component from `"./<Name>"`, passes it demo data, and is what the
  preview renders.
- `index.ts` lists the examples with their id, title, description, the component and both sources
  (`files: [{name: "<Name>.tsx", source}]`).

Register the page in that section's `pages.ts` and it appears in the routes, sidebar, search and pager. A page can set a
`notice` (for example a package to install) and `unlisted: true` to stay out of the sidebar.

Examples may only import `react`, `framer-motion`, `react-icons` and packages their page names in a notice, so they
work when pasted into a new project. Before opening a pull request, run `check-snippets` on your folder: it compiles
each usage file together with the component it imports, so a prop change that breaks the usage is caught.

The JavaScript version of every example is generated in the browser from the TypeScript source with Sucrase, so there
is only one version to maintain.

### Deploying

The site builds to static files with `npm run build`. Config AI needs `VITE_GROQ_API_KEY` set in the build
environment. Because it is a `VITE_` variable, the key ends up in the client bundle, so use a key with a spending limit
or move the call to a server function.

## Sell your template through ZenUI

Creators can sell React, Next.js and Tailwind CSS templates on ZenUI Library and earn 80% of each sale. Read the
[template submission guide](https://github.com/zenui-labs/zenui-library-react/blob/production/TEMPLATE_SUBMISSION_GUIDE.md)
for guidelines, submission steps and earnings.

## Support ZenUI

ZenUI is free. If it saves you time, you can support its development on Ko-fi.

<p><a href="https://ko-fi.com/zenuilabs"><img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/670f5a0172b90570b1c21dab_kofi_logo.png" height="42" width="150" alt="Support ZenUI on Ko-fi" /></a></p>

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/zenui-labs/zenui-library-react/blob/production/CONTRIBUTING.md).

## License

MIT. See [LICENSE.md](https://github.com/zenui-labs/zenui-library-react/blob/production/LICENSE.md).

## Connect with ZenUI

<p align="left">
<a href="https://x.com/zenuilabs" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="ZenUI on X" height="30" width="40" /></a>
<a href="https://www.linkedin.com/company/zenui-labs/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="ZenUI on LinkedIn" height="30" width="40" /></a>
<a href="https://web.facebook.com/zenuilabs" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="ZenUI on Facebook" height="30" width="40" /></a>
<a href="https://discord.gg/qbwytm4WUG" target="blank"><img align="center" src="https://static.vecteezy.com/system/resources/previews/023/986/612/non_2x/discord-logo-discord-logo-transparent-discord-icon-transparent-free-free-png.png" alt="ZenUI on Discord" height="45" width="45" /></a>
</p>
