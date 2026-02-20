# Banco Devsu — React Native + Expo (Interview Project)

Aplicación móvil para gestión de productos bancarios con arquitectura limpia (MVVM + UseCases + Repositories), backend Express y pruebas unitarias.

## 1) ¿Qué incluye este repo?

- Frontend mobile en React Native + Expo + TypeScript.
- Backend REST en Node + Express (workspace `backend/`).
- DI con Inversify, estado con MobX, formularios con react-hook-form + zod.
- Suite de pruebas unitarias con Jest (`test` y `test:coverage`).

## 2) Prerrequisitos

- Node.js 20+ recomendado.
- npm 10+ recomendado.
- Expo Go en dispositivo o emulador Android/iOS.

## 3) Levantar el proyecto (rápido)

### Opción A — Un solo comando (frontend + backend)

```bash
npm install
npm run dev
```

Esto ejecuta:
- Frontend Expo (`npm run start`)
- Backend en modo desarrollo (`npm run backend:dev`)

### Opción B — En terminales separadas

Terminal 1 (backend):

```bash
npm install
npm run backend:dev
```

Terminal 2 (frontend):

```bash
npm run start
```

## 4) Configuración de API (muy importante)

El frontend usa `EXPO_PUBLIC_API_BASE_URL` si está definido; si no, usa un valor por plataforma.

- Android emulador: por defecto funciona con `http://10.0.2.2:3002`.
- iOS simulador/dispositivo físico: define explícitamente la IP local de tu máquina.

Ejemplo (`.env` en la raíz):

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.8:3002
```

Luego reinicia Expo para tomar variables nuevas.

## 5) URLs y endpoints

- Backend base: `http://localhost:3002/bp`
- Endpoints principales:
  - `GET /products`
  - `GET /products/:id`
  - `GET /products/verification/:id`
  - `POST /products`
  - `PUT /products/:id`
  - `DELETE /products/:id`

Colección Postman disponible en `postman/BP Products API.postman_collection.json`.

## 6) Scripts útiles

- `npm run dev`: frontend + backend en paralelo.
- `npm run start`: Expo.
- `npm run android` / `npm run ios` / `npm run web`.
- `npm run backend:dev`: backend con recarga en caliente.
- `npm run backend:build` y `npm run backend:start`.
- `npm run test`: pruebas unitarias.
- `npm run test:coverage`: cobertura.
- `npm run lint` / `npm run lint:fix`.
- `npm run format` / `npm run format:check`.

## 7) Arquitectura (resumen)

Se sigue Clean Architecture:

- `ui/`: Screens + Components + ViewModels.
- `domain/`: Entities + Repository contracts + UseCases.
- `data/`: Models + Repository implementations + Services + Network.
- `config/`: DI container (`types.ts`, `di.ts`) + config runtime.

Flujo típico:

`Screen -> ViewModel -> UseCase -> Repository (interface) -> RepositoryImpl -> Service -> API`

## 8) Principios y estándares aplicados

- **SOLID**: responsabilidades separadas por capa (UI, ViewModel, UseCase, Repository, Service) y dependencia sobre abstracciones.
- **Clean Code**: nombres explícitos, métodos con propósito único, manejo centralizado de errores/estado y pruebas unitarias por flujo.
- **Design System**: uso de tokens y componentes reutilizables para UI consistente (`src/ui/styles/*` y `src/ui/components/*`).
- **Clean Architecture**: dirección de dependencias estricta (`ui -> domain contracts -> data implementations`).

## 9) Pruebas y calidad

- Framework: Jest (`jest-expo`).
- Setup global en `src/__test__/setupTests.ts` para reducir ruido de logs en consola.
- Cobertura global actual por encima del 70% requerido.

Comandos:

```bash
npm run test
npm run test:coverage
```

## 10) Postman

- Colección incluida: `postman/BP Products API.postman_collection.json`.
- Permite validar rápidamente los endpoints CRUD del backend sin depender de la app móvil.

## 11) Notas para entrevistadores

- El backend guarda datos en memoria (no base de datos persistente).
- Al reiniciar backend, el listado vuelve a vacío.
- El objetivo principal del proyecto es demostrar arquitectura, separación de capas, mantenibilidad y testing.
- El proyecto también evidencia aplicación práctica de SOLID, Clean Code y Design System en código productivo.

## 12) Solución de problemas comunes

- La app no conecta con backend:
  - verifica que backend esté corriendo en puerto `3002`.
  - ajusta `EXPO_PUBLIC_API_BASE_URL` con la IP local correcta.
  - reinicia Expo tras cambiar variables de entorno.
- En dispositivo físico no funciona `localhost`:
  - usa `http://<TU_IP_LOCAL>:3002`.
- Puerto ocupado:
  - cambia el puerto del backend y actualiza también `EXPO_PUBLIC_API_BASE_URL`.
