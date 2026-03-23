# Backend Security Hardening

This project has been prepared for cloud-backed persistent storage and safer runtime secrets.

## Applied Hardening

- Strong JWT secret configured in backend/.env
- Strong admin password configured in backend/.env
- Environment template available in backend/.env.example
- Sensitive files ignored by git via backend/.gitignore

## Immediate Operational Steps

- Rotate Atlas DB password from Atlas dashboard regularly.
- Update MONGO_URI and TARGET_MONGO_URI in backend/.env after rotation.
- Re-run `npm run create-admin` after changing ADMIN_PASSWORD.
- Restart backend: `npm run dev`.

## Recommended Production Settings

- Set NODE_ENV=production on deployment.
- Restrict Atlas Network Access to trusted IPs only.
- Do not share backend/.env publicly.
- Run `npm run backup-cloud` before major data changes.

## Validation Commands

- `npm run create-admin`
- `curl http://localhost:5000/api/health`
- `npm run backup-cloud`
