---
name: feature-scaffold-rn
description: Scaffold a new feature module in RN (Expo) following Kevin’s MVVM + MobX + Inversify Clean Architecture. Use when creating a new screen/feature end-to-end with UseCases, repository contract, repo impl, service, and DI bindings.
---

# Feature Scaffold — RN (Expo) + MVVM + MobX + Inversify

## Goal

Given a feature name (e.g., "Clients", "Measurements", "Sessions"), generate the **full vertical slice**:
UI Screen + ViewModel + UseCases + Domain contracts + Data implementations + DI bindings.

---

## Ask from user input (infer if missing)

- Feature name (PascalCase): `Feature`
- Main entities involved (e.g., Client, Session)
- CRUD actions required (default: list/get/create/update/delete)
- Data source / manager (default: REST via Axios)

If user didn’t specify, assume:

- REST backend with Axios manager
- Standard CRUD use cases
- Minimal UI skeleton + basic VM state/actions

---

## Files to create (default scaffold)

### UI

- `src/ui/screens/<Feature>/<Feature>Screen.tsx`
- `src/ui/screens/<Feature>/<Feature>ViewModel.ts`
- `src/ui/screens/<Feature>/components/` (only if needed)

### Domain

- `src/domain/entities/<Entity>.ts` (if new)
- `src/domain/repositories/<Feature>Repository.ts`
- `src/domain/useCases/`
  - `GetAll<Feature>UseCase/index.ts`
  - `Get<Feature>UseCase/index.ts`
  - `Create<Feature>UseCase/index.ts`
  - `Update<Feature>UseCase/index.ts`
  - `Delete<Feature>UseCase/index.ts`
  - `UseCase.ts` (base interface)

### Data

- `src/data/models/<entityModel>.ts` (DTO/JSON ↔ Domain mapper)
- `src/data/services/<Feature>Service.ts` (service that delegates to the selected manager)
- `src/data/repositories/<Feature>RepositoryImpl.ts`

### DI

- Edit `src/config/types.ts`
- Edit `src/config/di.ts`

### Unit tests

- `src/__test__/domain/useCases/<feature>/` (use case tests)
- `src/__test__/ui/viewModels/<Feature>ViewModel.test.ts` (viewmodel tests)
- Optional: `src/__test__/data/repositories/<Feature>RepositoryImpl.test.ts` (mapping/contract tests)

---

## Implementation rules

- UI depends only on ViewModel
- ViewModel depends only on UseCases
- UseCases depend only on domain contracts
- Data layer implements contracts and calls service/network
- Keep manager details isolated in service/network adapters (Axios, Firebase, GraphQL, etc.)
- Map transport models to domain entities (don’t leak manager-specific shapes to domain/UI)

### Entity and model structure (mandatory)

- Domain entities MUST be class-based (not plain interfaces) with:
  - `type <Entity>ConstructorParams`
  - index signature `[key: string]: any`
  - constructor assigning required fields and defaults for dates/errors
  - `Object.assign(this, params)`
- Data models MUST follow this shape:
  - `type <Entity>ModelConstructorParams`
  - utility date parser (e.g. `toDate(value: unknown): Date`)
  - `static fromJson(json)`
  - `toJson(): Record<string, unknown>`
  - `declare module './<entityModel>'` + `prototype.toDomain()` returning domain entity
- Preserve backend field names exactly as requested (snake_case or custom names), do not auto-rename.

### Canonical templates (reference)

- Entity template:

```ts
export type <Entity>ConstructorParams = {
  id: string;
  // ...fields
  [key: string]: any;
};

export class <Entity> {
  [key: string]: any;

  id: string;
  // ...fields

  constructor(params: <Entity>ConstructorParams) {
    this.id = params.id;
    // ...assignments
    Object.assign(this, params);
  }
}
```

- Model template:

```ts
export class <Entity>Model {
  static fromJson(json: any): <Entity>Model {
    return new <Entity>Model({ ...json });
  }

  toJson(): Record<string, unknown> {
    return { ... };
  }
}

declare module './<entityModel>' {
  interface <Entity>Model {
    toDomain(): <Entity>;
  }
}

<Entity>Model.prototype.toDomain = function toDomain(): <Entity> {
  return new <Entity>({ ... });
};
```

### Apply SOLID explicitly

- **S — Single Responsibility:** each class has one reason to change (Screen renders UI, ViewModel orchestrates state/actions, UseCase executes one business action, Repository handles persistence contract).
- **O — Open/Closed:** extend behavior by adding new UseCases/services, avoid modifying existing stable contracts unless required.
- **L — Liskov Substitution:** implementations (`XxxRepositoryImpl`, `XxxServiceImpl`) must respect interface behavior and return types without surprises.
- **I — Interface Segregation:** prefer small focused contracts (split read/write concerns when needed) instead of large “god interfaces”.
- **D — Dependency Inversion:** depend on abstractions (`domain/repositories`, `domain/services`) and inject via Inversify `TYPES`, never on concrete data classes in domain/UI layers.

### Use case convention (mandatory)

- Each use case MUST live in its own folder: `src/domain/useCases/<UseCaseName>/index.ts`.
- Every use case MUST import `UseCase` from `src/domain/useCases/UseCase.ts`.
- Every use case class MUST `implement UseCase<Input, Output>`.
- Public execution method MUST be named `run(data)` (or `run()` when input is `void`).

---

## ViewModel template (minimum)

- `loading`, `error`, `items` state
- `load()` action
- `create/update/delete` actions calling use cases
- computed getters for derived data
- optional `reaction` for autosave/sync with debounce

---

## DI checklist (must do)

1. Add `TYPES.<Feature>Service`
2. Add `TYPES.<Feature>Repository`
3. Add `TYPES.<UseCases...>`
4. Add `TYPES.<Feature>ViewModel` (if using DI retrieval)
5. Bind:
   - Service: singleton
   - RepoImpl: singleton
   - UseCases: transient
   - ViewModel: transient

---

## Unit testing requirements (must do)

- Test UseCases with `jest.fn()` mocks for repository contracts (no DI container in unit tests).
- Test ViewModel state transitions (`loading`, `error`, `items`) and action flows (`load`, `create`, `update`, `delete`).
- Cover happy path + at least one failure path per critical action.
- Keep tests deterministic: no Firebase/network calls, no real timers unless required.
- Verify interaction contracts (`toHaveBeenCalledWith`) between ViewModel → UseCase and UseCase → Repository.

### Minimum test checklist per scaffold

1. `GetAll<Feature>UseCase` success and error
2. `Create<Feature>UseCase` input handling and repository call
3. `<Feature>ViewModel.load()` updates `loading/items/error` correctly
4. One mutating action in ViewModel (`create`/`update`/`delete`) with success + failure

---

## Output format (must follow)

Return:

1. A file-by-file plan (paths)
2. Code blocks per file (or diffs)
3. DI changes explicitly shown
4. Unit test files + test cases added
5. “How to test” steps (`npm test` and targeted test command)
