# Planner

> A Jira-like clone for learning Next.JS, Tailwind, and Next-Auth

![Build](https://github.com/dv297/planner/actions/workflows/nextjs.yml/badge.svg)

# Developer Notes

## Creating a migration

```bash
npx prisma migrate dev --name added_job_title
```

## Clearing Docker Configuration

```bash
docker system prune --volumes
```

## Database Reset

```sql
truncate "User" cascade;
truncate "Workspace" cascade;
truncate "Team" cascade;
```
