# Fauna DB schema for LUMINA

Run these in the Fauna dashboard (Shell or Dashboard → Collections / Indexes).

## Collections

Create collections: `galleries`, `images`, `clients`, `favorites`, `access`, `downloads`, `shares`.

## Indexes

```fql
// Resolve gallery by human-readable code (e.g. WED-2025-001)
CreateIndex({
  name: "galleries_by_code",
  source: Collection("galleries"),
  terms: [{ field: ["data", "code"] }],
  unique: true
})

// List all galleries an email has access to (for email-only login)
CreateIndex({
  name: "access_by_email",
  source: Collection("access"),
  terms: [{ field: ["data", "email"] }]
})

// Check if email has access to a gallery (galleryId = gallery code)
CreateIndex({
  name: "access_by_email_gallery",
  source: Collection("access"),
  terms: [{ field: ["data", "email"] }, { field: ["data", "galleryId"] }],
  unique: true
})

// List favorites for a user in a gallery
CreateIndex({
  name: "favorites_by_user_gallery",
  source: Collection("favorites"),
  terms: [{ field: ["data", "userEmail"] }, { field: ["data", "galleryId"] }]
})

// Find one favorite by user + image (for remove)
CreateIndex({
  name: "favorite_by_user_image",
  source: Collection("favorites"),
  terms: [{ field: ["data", "userEmail"] }, { field: ["data", "imageId"] }],
  unique: true
})
```

## Gallery document shape

Each document in `galleries` should have at least:

- `code` (string) – e.g. `WED-2025-001`; must be unique (used in URLs and access).
- `title`, `category`, `date`, `location`, `expiresAt`, `cover` (optional).
- `images` (array of objects):
  - `url` (required), optional `urlWeb`, `urlPrint`, `urlHighRes`, `filename`
  - `title`, `meta`, `id` (optional; if missing, backend generates one).

## Access document shape

- `email` (string)
- `galleryId` (string) – must match a gallery’s `code`.

Create one document per client–gallery pair so they can receive a magic link for that gallery.
