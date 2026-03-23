# Cloud MongoDB (Permanent Storage) Setup

This project can use MongoDB Atlas for permanent cloud storage.

## 1) Create Atlas Database

- Create a free/shared cluster in MongoDB Atlas.
- Create a DB user and password.
- In Network Access, allow your current IP (or 0.0.0.0/0 for temporary testing only).
- Copy the connection string, for example:
  - mongodb+srv://<username>:<password>@<cluster-url>/college_platform?retryWrites=true&w=majority

## 2) Configure backend/.env

Add these variables in backend/.env:

- SOURCE_MONGO_URI=mongodb://localhost:27017/college_platform
- TARGET_MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/college_platform?retryWrites=true&w=majority
- CLEAR_TARGET_BEFORE_MIGRATE=true

## 3) Migrate existing local data to Atlas

From backend folder run:

- npm run migrate-cloud

This copies all collections and documents from SOURCE_MONGO_URI to TARGET_MONGO_URI.

## 4) Switch app to permanent cloud storage

After migration success, set:

- MONGO_URI=<same value as TARGET_MONGO_URI>

in backend/.env and restart backend:

- npm run dev

Now all app data is stored permanently in Atlas, not local MongoDB.

## 5) Recommended production notes

- Never commit real connection strings to git.
- Use a strong DB password.
- Restrict network access in Atlas to trusted IPs.
- Keep regular backup/snapshots enabled in Atlas.

## 6) Manual JSON backup export

From backend folder run:

- npm run backup-cloud

This exports all collections from current MONGO_URI into timestamped JSON files under:

- backend/backups/<timestamp>/
