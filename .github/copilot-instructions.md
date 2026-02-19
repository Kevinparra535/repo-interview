# Elegance App — AI Agent Instructions

> Beauty salon management app (React Native / Expo SDK 54). Spanish-language UI for seamstresses/tailors.
> Manages clients, measurement sessions, photos, pricing, revenue, expenses, AI assistant, and offline sync — all backed by Firebase.

## Architecture — Clean + MVVM + MobX + Inversify

### Dependency direction (strict)

```
UI (screens, components)  →  ViewModels  →  UseCases  →  Domain contracts (interfaces)
                                                              ↑ implements
                                                         Data layer (Firebase, network)
```

**Forbidden:** UI importing `data/*` or Firebase · ViewModel importing `data/*` · Domain importing RN/Expo/Firebase/MobX/Inversify.

### Folder map

| Layer         | Path                                    | Contents                                                                                                                                            |
| ------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI screens    | `src/ui/screens/<Feature>/`             | `XxxScreen.tsx`, `XxxViewModel.ts`, `styles.ts`, `components/`                                                                                      |
| UI shared     | `src/ui/components/shared/`             | Reusable components across features                                                                                                                 |
| UI styles     | `src/ui/styles/`                        | `Colors.ts` (base/semantic/brand), `Fonts.ts` (PlayfairDisplay headers, Inter body, `ms()` scaling), `Spacings.ts`, `BorderRadius.ts`, `Shadows.ts` |
| Navigation    | `src/ui/navigation/RootNavigation.tsx`  | NativeStack + BottomTabs, typed `RootStackParamList`                                                                                                |
| Domain        | `src/domain/entities/`                  | Entity classes/types (e.g., `Client`, `MeasurementSession`, `PhoneContact`)                                                                         |
| Domain        | `src/domain/repositories/`              | Repository interfaces + co-located input/output types                                                                                               |
| Domain        | `src/domain/services/`                  | Service interfaces                                                                                                                                  |
| Domain        | `src/domain/useCases/<action>/index.ts` | One folder per use case, implements `UseCase<T, R>`                                                                                                 |
| Data models   | `src/data/models/`                      | Firestore ↔ Domain mappers: `fromJson()` → `toDomain()` / `toJson()`                                                                                |
| Data repos    | `src/data/repositories/`                | `XxxRepositoryImpl.ts` — delegates to a Service                                                                                                     |
| Data services | `src/data/services/`                    | `XxxServiceImpl.ts` — Firestore queries via `FirebaseManager`                                                                                       |
| Data network  | `src/data/network/FirebaseManager.ts`   | Singleton — inits Auth/Firestore/Storage, emulator support                                                                                          |
| Config        | `src/config/`                           | `types.ts` (DI symbols), `di.ts` (bindings), `env.ts` (Zod-validated env vars), `config.ts`                                                         |
| Stores        | `src/stores/`                           | `AuthStore`, `RootStore`, `MeasurementSessionStore` — singletons for cross-screen state                                                             |

### Naming conventions

| Artifact       | Pattern                                             | Example                                         |
| -------------- | --------------------------------------------------- | ----------------------------------------------- |
| Screen         | `XxxScreen.tsx`                                     | `ClientFormScreen.tsx`                          |
| ViewModel      | `XxxViewModel.ts`                                   | `ClientFormViewModel.ts`                        |
| UseCase        | `VerbNounUseCase` in `useCases/<verbNoun>/index.ts` | `createClient/index.ts` → `CreateClientUseCase` |
| Repo interface | `xxxRepository.ts` (camelCase file)                 | `clientsRepository.ts`                          |
| Repo impl      | `XxxRepositoryImpl.ts`                              | `ClientsRepositoryImpl.ts`                      |
| Service impl   | `XxxServiceImpl.ts`                                 | `AuthServiceImpl.ts`                            |
| Data model     | `xxxModel.ts`                                       | `clientModel.ts`                                |

## Key Patterns

### Screen → ViewModel wiring (every screen uses this exact pattern)

```tsx
import { observer } from 'mobx-react-lite';
const XxxScreen = observer(() => {
  const viewModel = useMemo(() => container.get<XxxViewModel>(TYPES.XxxViewModel), []);
  useEffect(() => {
    viewModel.initialize();
  }, []);
  // ...
});
```

- ViewModel resolved from DI container via `useMemo` (transient — one instance per mount)
- Screen wrapped in `observer()` for MobX reactivity
- Navigation: `useNavigation<NativeStackNavigationProp<RootStackParamList>>()`
- Styles in co-located `styles.ts` with `StyleSheet.create()`
- Sub-components in `./components/` directory, receive VM as prop

### ViewModel conventions

- `@injectable()` class + deps via `@inject(TYPES.X)` in constructor
- `makeAutoObservable(this)` — state = fields, computed = getters, actions = methods
- Async state changes: `runInAction(() => { this.field = value; })`
- Side effects: `reaction(...)` with debounce when needed
- ViewModels orchestrate UseCases; never contain Firestore/Firebase code

### UseCase pattern

```ts
@injectable()
export class CreateClientUseCase implements UseCase<Input, Output> {
  constructor(@inject(TYPES.ClientsRepository) private repo: ClientsRepository) {}
  async run(data: Input): Promise<Output> {
    /* ... */
  }
}
```

Base interface: `UseCase<T, R>` with single method `run(data: T): Promise<R>`. One action = one use case.

### Data model mapping

```
Firestore doc → Model.fromJson(doc) → model.toDomain() → Domain Entity
Domain data  → new Model(data)      → model.toJson()   → Firestore write
```

Models handle `Timestamp` ↔ `Date` conversion. Firestore paths are user-scoped: `users/${userId}/clients/${clientId}`.

### DI rules (`src/config/types.ts` + `src/config/di.ts`)

- Symbols: `TYPES.XxxService = Symbol.for('XxxService')` (flat object, grouped by comments)
- **Lifetimes:** Services/Repos/Stores → `.inSingletonScope()` · UseCases/ViewModels → transient (default)
- When creating a new injectable class: add symbol to `types.ts` AND binding to `di.ts`
- Import order in `di.ts` follows its own ESLint group: network → stores → repos → services → useCases → viewModels

### Stores vs ViewModels

|          | Stores (singleton)                     | ViewModels (transient)              |
| -------- | -------------------------------------- | ----------------------------------- |
| Lifetime | App-wide, survive navigation           | Per screen mount                    |
| Purpose  | Auth state, multi-step wizard state    | Screen data loading, actions        |
| Examples | `AuthStore`, `MeasurementSessionStore` | `HomeViewModel`, `ClientsViewModel` |

### Forms

- **Auth screens:** `react-hook-form` + `zodResolver` (schemas in `src/ui/schemas/`)
- **Data entry screens:** `react-hook-form` + `Controller` with imperative `rules.validate`
- Hydration: `useEffect` + `reset(entityData)` when loading existing records

### Offline sync

`SyncManager` polls network every 5s via `expo-network`, queues writes to `AsyncStorage` with prefixed keys (`pending_sync_*`, `pending_client_sync_*`), syncs sequentially on reconnect. Exposes MobX observables (`syncStatus`, `isOnline`) for UI indicators.

## Import Ordering (ESLint `simple-import-sort`)

Strict import groups enforced with blank lines between groups. Rules differ per file type — see `.eslintrc.js` overrides for `.tsx`, `.ts`, `di.ts`, and `*.viewModel.tsx` files.

General `.tsx` ordering: (1) react + third-party → (2) relative `./` `../` → (3) `@/domain/`, `@/config/`, `@/ui/`.

Path alias: `@/` → `src/` (synced in `tsconfig.json` + `babel.config.js`).

## Dev Workflow

| Command                           | Purpose                             |
| --------------------------------- | ----------------------------------- |
| `npm start`                       | Expo dev server (default variant)   |
| `npm run start:dev`               | Dev variant with Firebase emulators |
| `npm run android:dev` / `ios:dev` | Build + run on device               |
| `npm run lint`                    | ESLint check                        |
| `npm run format`                  | Prettier format                     |
| `npm test`                        | Jest unit tests (`src/__test__/`)   |
| `npm run e2e:maestro`             | Maestro E2E tests (`e2e/maestro/`)  |

### Environment variants

`APP_VARIANT` = `dev` | `preview` | `production` — controls bundle ID, app name, Firebase project. Set via `cross-env` in npm scripts. Validated with Zod at startup (`src/config/env.ts`).

### Builds

Use **EAS Build** (cloud, not local). Profiles in `eas.json`: `development` → dev client · `preview` → internal APK · `production` → Play Store.

## Testing

Tests in `src/__test__/` use Jest. Pattern: instantiate use case/repo directly with `jest.fn()` mocks (no DI container in tests). Helper factories like `makeClient()` for test data. Test language is mixed English/Spanish.

## Anti-patterns (reject)

- Importing `data/*` into ViewModel or UI
- Repositories returning raw Firestore data (must map to domain entities via models)
- UseCases doing UI formatting
- Resolving UseCases directly in screen components (should be in ViewModel)
- Missing DI symbol or binding for new injectable classes
- Hardcoding Firestore collection paths outside data services
