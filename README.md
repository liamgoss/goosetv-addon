# GooseTV Addon for Stremio

**GooseTV** is a custom Stremio addon that provides live IPTV streams including (my) local news and (soon) live sports, scraped in real time and served directly through Stremio. This project is designed to be lightweight, dynamic, and self-hostable.

---

## Features

- Live streaming of **Local 3 News (Chattanooga)**
- Dynamically scraped `.m3u8` streams using Puppeteer
- Poster images served via GitHub or local Express static server
- Compatible with **Stremio Desktop App**
- Easy to add more channels via `channels.json`
- Built-in caching for faster repeated access

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/liamgoss/goosetv-addon.git
cd goosetv-addon
```

### 2. Install dependencies
```bash
npm install
```


### 3. Run the addon server
```bash
node index.js
```

This will serve the addon manifest + catalog + streams on localhost port 7001

## Local Testing in Stremio
> Requires Stremio Desktop App (not Web version)

1. Open Stremio Desktop
2. Go to Add-ons
3. In the search bar, paste: 
`
http://localhost:7001/manifest.json
`

You should now see GooseTV Channels under the "TV" section.
