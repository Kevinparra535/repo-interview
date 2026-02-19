---
name: pr-checklist-clean-architecture
description: Review a PR or changeset to ensure Kevin’s Clean Architecture (RN Expo + MVVM + MobX + Inversify) rules are respected. Use when asked to review code or before merging.
---

# PR Checklist — Clean Architecture Compliance

## Dependency direction

- [ ] UI does not import `data/*` or Firebase directly
- [ ] ViewModels do not import `data/*`
- [ ] UseCases do not import `data/*`
- [ ] Domain does not import framework libs

## Layer correctness

- [ ] New actions are modeled as UseCases (1 action = 1 use case)
- [ ] Repositories are interfaces in `domain/` and implemented in `data/`
- [ ] Data returns mapped domain entities (no Firestore snapshots to UI)

## DI correctness

- [ ] New TYPES added in `types.ts`
- [ ] Bindings exist in `di.ts` with appropriate lifetimes
- [ ] All injected classes are `@injectable()`
- [ ] Constructor deps use `@inject(TYPES.X)`

## ViewModel quality

- [ ] `makeAutoObservable(this)` used
- [ ] Actions / computed are clear
- [ ] Side effects use `reaction` with debounce when needed
- [ ] Error & loading states handled

## Testing / QA

- [ ] Clear steps to validate feature
- [ ] No sensitive keys committed
- [ ] Lint/build passes (if applicable)
