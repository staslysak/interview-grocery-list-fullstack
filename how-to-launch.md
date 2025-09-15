# How to launch

```docker compose up -d
docker compose exec api npm run prisma:migrate:deploy
docker compose exec api npx prisma db seed
```
