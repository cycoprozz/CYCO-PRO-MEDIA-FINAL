# LUMINA Client Portal

Luxury photography client portal: magic-link auth, private galleries, favorites, downloads, and Wow Mode mockups.

## Stack

- **Host:** Netlify (static + serverless functions)
- **DB:** FaunaDB (galleries, access, favorites, downloads, shares)
- **Email:** SMTP (e.g. Resend) for magic links
- **Assets:** Cloudinary (optional, for Wow mode uploads)

## Setup

### 1. Clone and install

```bash
cd lumina-portal
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` (or set in Netlify UI):

- **JWT_SECRET** – Min 32 characters; used for session and magic-link tokens.
- **FAUNA_SECRET** – Fauna DB server key.
- **SMTP_*** – SMTP credentials for sending magic-link emails.
- **URL** – Public site URL (e.g. `https://your-site.netlify.app`), used in magic and share links.
- **CLOUDINARY_***** – Optional; for Wow mode: upload generated images and return URLs instead of base64.

### 3. Fauna schema

**Option A – run the setup script (recommended):**

```bash
FAUNA_SECRET=your-fauna-secret node scripts/fauna-setup.js
```

**Option B – create manually in the Fauna dashboard:**

**Collections:** `galleries`, `images`, `clients`, `favorites`, `access`, `downloads`, `shares`

**Indexes:**

- `galleries_by_code` on `galleries`, terms: `[["data", "code"]]`, **unique: true**
- `access_by_email_gallery` on `access`, terms: `[["data", "email"], ["data", "galleryId"]]`, unique: true
- `favorites_by_user_gallery` on `favorites`, terms: `[["data", "userEmail"], ["data", "galleryId"]]`
- `favorite_by_user_image` on `favorites`, terms: `[["data", "userEmail"], ["data", "imageId"]]`, unique: true

**Gallery documents** must include a `code` (e.g. `WED-2025-001`) and an `images` array. Each image: `url`, optional `urlWeb`/`urlPrint`/`urlHighRes`, `title`, `meta`, optional `id`/`filename`.

**Access documents** link clients to galleries: `email`, `galleryId` (the gallery `code`).

### 4. Seed sample data (optional)

After running the schema setup, add one gallery and one client access for testing:

```bash
npm run fauna-seed
```

(Uses `FAUNA_SECRET` from `.env`.) Then you can log in with email `client@example.com`.

### 5. Build and run locally

**Option A – demo mode (no Fauna or SMTP):**

```bash
npm run build
npm run start
```

Open **http://localhost:8889**. Click **Enter** to go straight to the gallery (no login). Favorites and share links work in memory.

**Option B – full stack with Netlify CLI (requires Node 18):**

```bash
npm run build
npm run dev
```

Open the URL shown. Set real `FAUNA_SECRET` and SMTP in `.env` for magic-link email and persisted data.

### 6. Deploy

Connect the repo to Netlify, set the env vars, and deploy. Build command: `npm run build`; publish directory: `dist`; functions: `netlify/functions`.

## API (Netlify functions)

| Path | Method | Description |
|------|--------|-------------|
| `/api/auth-login` | POST | Send magic link (body: `email`; gallery resolved from access) |
| `/api/auth-verify` | GET | Consume `?token=`, set session cookie, redirect to `/gallery/:code` |
| `/api/session-check` | GET | Return `{ galleryId, email }` or 401 |
| `/api/logout` | POST | Clear session, redirect to `/` |
| `/api/gallery-get/:id` | GET | Gallery + favorites for session (id = gallery code) |
| `/api/gallery-list` | GET | List galleries for current session |
| `/api/favorites-save` | POST | Body: `imageId`, `action` (add/remove), `galleryId` |
| `/api/favorites-get` | GET | Query: `galleryId` |
| `/api/download-zip` | POST | Body: `imageIds[]`, `galleryId`, `quality` (web/print) |
| `/api/wow-generate` | POST | Body: `imageId`, `template` (billboard/magazine/gallery/penthouse) |
| `/api/share-create` | POST | Body: `galleryId`, optional `expiresInHours` |

## Wow mode and Sharp

- **Templates:** Overlay images can be provided via env (e.g. `WOW_OVERLAY_BILLBOARD` URL). If not set, only the base image is processed (no overlay).
- **Response:** With Cloudinary configured, the function uploads the result and returns a URL; otherwise it returns a base64 data URL (subject to response size limits).
- **Sharp on Netlify:** The default Sharp build is used. If you hit runtime errors, check [Netlify’s Node/Sharp docs](https://docs.netlify.com/functions/build-with-javascript/#native-modules) for any required configuration.

## Demo mode

If `FAUNA_SECRET` is unset or still the placeholder, the app runs in **demo mode**: no Fauna or SMTP. Use `npm run start` (Node server on port 8889) to serve the site and run the functions locally. Click **Enter** on the landing page; no email or login required. Favorites are kept in memory for the session.

## Security

- Session is stored in an HTTP-only, SameSite=Strict cookie.
- CSP and other security headers are set in `netlify.toml`.
- Keep `JWT_SECRET` and `FAUNA_SECRET` only on the server; never expose them to the client.
