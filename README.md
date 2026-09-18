# DDS Continuous Improvement Hub — GitHub Pages Demo

This repository is a presentation-ready prototype of a multi-line Daily Direction Setting and continuous-improvement hub.

The GitHub Pages site is **demo hosting only**. The intended production version lives inside the company SharePoint environment using SharePoint Pages, Microsoft Lists, Power Automate, the Standards document library, and existing Microsoft 365 permissions.

## What the demo includes

- S Line, T Line, and combined performance views
- Current-week and next-week selection
- Weekly rollover behavior
- Action Center with line ownership
- CI project pipeline
- Standards library mockup
- SharePoint implementation map

Demo entries are stored only in the browser session and reset when the page is refreshed.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `dds-continuous-improvement-hub`.
2. Upload every file from this package to the root of the repository.
3. Open the repository's **Settings**.
4. Select **Pages** under **Code and automation**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/(root)`, then select **Save**.
7. GitHub will display the published address when deployment finishes. It normally follows this format:

   `https://YOUR-USERNAME.github.io/dds-continuous-improvement-hub/`

## Updating the demo

Replace `index.html`, `styles.css`, or `app.js` in the repository and commit the changes. GitHub Pages republishes the site automatically.

## Files

- `index.html` — page structure and visible demo content
- `styles.css` — SharePoint-style layout and responsive design
- `app.js` — line filters, action flow, and weekly rollover interactions
- `.nojekyll` — tells GitHub Pages to serve the site as plain static files

