# LifeArchive Landing Page

Modern startup landing page for LifeArchive, built with pure HTML, CSS, and vanilla JavaScript.

## Project Structure

- index.html
- css/style.css
- js/main.js
- images/hero.png
- images/timeline.png
- images/search.png
- images/memory.png

## How to Run Locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open index.html in a browser.
4. Optional: Use VS Code Live Server for automatic refresh.

## How to Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, go to Settings > Pages.
3. Under Build and deployment, set Source to Deploy from a branch.
4. Select Branch: main (or your default branch) and Folder: /(root).
5. Save. GitHub will publish your site in about 1-2 minutes.

## How to Connect Google Analytics

1. Create a property in Google Analytics (GA4).
2. Copy your measurement ID (for example: G-XXXXXXXXXX).
3. Add this snippet inside the head tag in index.html, replacing the ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## How to Replace Formspree Endpoint

1. Create a form in Formspree.
2. Copy your Formspree endpoint (for example: https://formspree.io/f/abcd1234).
3. Open index.html.
4. Find the form element in the waitlist section.
5. Replace the current action value with your real endpoint:

```html
<form action="https://formspree.io/f/your-form-id" method="POST">
```

## How to Customize Text and Branding

1. Update page copy in index.html:
   - Headline and section text
   - CTA labels
   - FAQ content
2. Update brand styling in css/style.css:
   - Color variables in :root
   - Typography and spacing
   - Button style and card look
3. Replace placeholder images in images/ with your product visuals:
   - hero.png
   - timeline.png
   - search.png
   - memory.png

## Notes

- Built for static hosting and GitHub Pages.
- No frameworks, no build tools required.
- Includes smooth scrolling, reveal animations, sticky navigation, and responsive layout.
