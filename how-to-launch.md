# How to launch

## Dont forget to create .env files

```docker compose up -d
docker compose exec api npm run prisma:migrate:deploy
docker compose exec api npx prisma db seed
```

## Creds to login

```
testuser@example.com
testpassword
```
