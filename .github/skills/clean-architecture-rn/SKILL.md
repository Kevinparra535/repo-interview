---
name: clean-architecture-rn-expo-mvvm
description: Apply our standard Clean Architecture for React Native (Expo) using MVVM + MobX + Inversify. Use this when creating new features, screens, viewmodels, use cases, repositories, services, and DI bindings.
---

# Skill Instructions — Clean Architecture (RN Expo + MVVM + MobX + Inversify)

## When to use

Use this skill whenever you:

- Add a new screen/feature module
- Create or refactor ViewModels, UseCases, repositories, services
- Touch DI (`src/config/di.ts`, `src/config/types.ts`)
- Need folder placement conventions or dependency direction rules

## Non-negotiable rules (dependency direction)

- UI/View depends on ViewModel only.
- ViewModel depends on UseCases (NOT repositories directly).
- UseCases depend on domain contracts (interfaces), not data implementations.
- Data layer implements repositories/services and talks to Firebase/network.
- Keep domain layer free of framework/infrastructure.

## SOLID requirements (must apply)

- **S — Single Responsibility:** Screen renders UI only, ViewModel manages presentation state/actions, UseCase executes one business action, Repository/Service handles persistence/integration concerns.
- **O — Open/Closed:** extend behavior through new use cases/services or new implementations; avoid editing stable contracts unless the requirement truly changes.
- **L — Liskov Substitution:** every implementation must be safely substitutable for its interface (same input/output expectations, no hidden side effects).
- **I — Interface Segregation:** prefer small focused contracts; split interfaces when consumers use only subsets of behavior.
- **D — Dependency Inversion:** upper layers depend on abstractions from `domain/*`; concrete implementations are wired only through DI (`TYPES` + bindings).

## Folder placement

- UI screens + components: `src/ui/...`
- ViewModels: colocated next to screens (e.g. `src/ui/screens/<Feature>/<Feature>ViewModel.ts`)
- Use cases: `src/domain/useCases/`
- Domain entities: `src/domain/entities/`
- Repository contracts: `src/domain/repositories/`
- Domain services contracts: `src/domain/services/`
- Data implementations: `src/data/...` (services/network/models/repositories)

## Naming conventions

- `XxxScreen.tsx`
- `XxxViewModel.ts`
- `VerbNounXxxUseCase.ts` (one action = one use case)
- `XxxRepository` (interface in domain)
- `XxxRepositoryImpl` (implementation in data)
- `XxxService` / `XxxServiceImpl` as needed

## DI requirements (Inversify)

- All injectable classes must use `@injectable()`
- Constructor dependencies must use `@inject(TYPES.Something)`
- Register in `src/config/di.ts` and add symbol in `src/config/types.ts`
- Prefer Singleton for services/managers; transient for UseCases and ViewModels unless specified

### DI binding checklist

When adding a new module:

1. Add `TYPES.<NewThing>` in `types.ts`
2. Bind in `di.ts`:
   - Manager/Service: `.inSingletonScope()` if shared
   - UseCases: transient
   - ViewModel: transient (or singleton only if truly global)

## ViewModel pattern (MobX)

- Use `makeAutoObservable(this)` inside constructor
- Keep state as fields; actions as methods; computed as getters
- Prefer `reaction(...)` for autosave side effects (with debounce)
- Never put direct Firebase calls in UI components—only in VM via UseCases

## Unit testing requirements (must apply)

- Add unit tests for UseCases and ViewModels when creating/refactoring features.
- Use `jest.fn()` mocks for repository/service contracts (no DI container required in tests).
- Validate success and failure paths for critical actions.
- Assert collaboration contracts (`toHaveBeenCalledWith`) between ViewModel → UseCase and UseCase → Repository.
- Keep tests deterministic (no real network/Firebase, avoid real timers unless necessary).

### Minimum unit test checklist

1. UseCase happy path (expected output + dependency call assertions)
2. UseCase error path (propagation/handling)
3. ViewModel action state transitions (`loading`, `error`, domain state fields)
4. At least one mutating action (`create`/`update`/`delete`) with success + failure scenarios

## Output expectations

When implementing a request:

- Propose the file list you will create/edit
- Follow the layer rules above
- Provide minimal diffs or clear code blocks per file
- Update DI bindings if new classes are added
- Include unit test files/cases added and how to run them (`npm test` or targeted jest command)

---

## Reference (full architecture doc)

This project follows:

- React Native (Expo) + MVVM
- MobX for state
- Inversify for DI
- UseCases layer per action
- Data layer (RepoImpl → Service → Firebase)
