# ows-events

Project to promote, publish and collect events

## How to install

```bash
npm run i
```

## How to run

Copy `.env.example` to `.env` in frontend package

```bash
npm run dev:frontend
```

```bash
npm run dev:backend
```

## Development workflow at local worstation

Pull docker image

```bash
docker-compose -f docker-compose.yml pull
```

Run project

```bash
docker-compose -f docker-compose.yml up -d
```

Down project

```bash
docker-compose -f docker-compose.yml down
```

Rebuild project

```bash
[docker-compose -f docker-compose.yml build] | [docker-compose -f docker-compose.yml up -d --build]
```
