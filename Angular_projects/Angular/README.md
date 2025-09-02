1. Scaffold (Angular 15)

```bash
# Use Angular CLI v15
npx -p @angular/cli@15 ng new resume-ng --routing --style=scss --strict

cd resume-ng
```

Why these flags

- `@angular/cli@15`: locks us to Angular 15 (you asked to stay pre‑signals).
- `--routing`: creates a router setup from day 1 so we can demo lazy loading, guards, etc.
- `--style=scss`: SCSS is friendlier for variables & mixins when we scale examples.
- `--strict`: enables strict TS and strict template checks. Concretely:
  - `tsconfig.json` gets `strict: true`, plus `noImplicitAny`, `strictNullChecks`, etc.
  - `angularCompilerOptions.strictTemplates: true` → the template type checker will catch unsafe bindings early. This is vital when we write custom directives/pipes and advanced forms.

This gives us strict TypeScript, Jasmine/Karma tests wired, and routing.

2. Add code‑quality & helper tooling

```bash
# ESLint for Angular 15
ng add @angular-eslint/schematics@15

# (Optional) Git hooks to keep things neat
npm i -D husky lint-staged
npx husky install
```

What this does

- `@angular-eslint` replaces old TSLint rules with ESLint tailored for Angular v15 projects (templates + TS). It scaffolds an `.eslintrc.json` with sensible Angular rules (e.g., selector conventions, lifecycle hook ordering, etc.).
- Prettier enforces format consistency. The sort‑imports plugin keeps imports deterministic, reducing noisy diffs.

- `OnPush` change detection: we’ll use this to demo performance and correctness later. OnPush re-checks when:
  - an `@Input()` reference changes,
  - an event fires in the component,
  - an `async` pipe emits, or
  - you call `markForCheck()` manually.
    This sets us up to discuss immutable patterns and RxJS streams the right way.

- Click spam? `exhaustMap`
- Route/search that changes often? `switchMap`
- Must keep order (writes)? `concatMap`
- Need parallelism? `mergeMap`

## Mental Model of Angular terms

- Router
  The service that navigates (`router.navigate(...)`), knows the current URL (`router.url`).

- Route (config)
  The static objects you put in `routes = [{ path: 'users/:id', component: UserCmp, data: { title: 'Users' } }]`.

- ActivatedRoute (live, observable)
  The runtime route for the component currently displayed. It exposes streams that update when the URL/params change while the component stays mounted.
  Key bits:
  - `paramMap`, `queryParamMap`, `fragment`, `url`, `data` → Observables
  - `snapshot` → a one-time, immutable capture
  - `parent`, `firstChild`, `pathFromRoot` → walk the route tree

  Use ActivatedRoute (observables) when the same component can stay alive while the URL changes (e.g., `/users/1` → `/users/2` with the same UserComponent).

  ```ts
  // Angular 15+
  constructor(private route: ActivatedRoute) {}

  id$ = this.route.paramMap.pipe(
    map(p => p.get('id')),
    distinctUntilChanged()
  );

  // or one-time read of current value if you truly don't expect it to change:
  const id = this.route.snapshot.paramMap.get('id'); // beware of reuse!
  ```

- ActivatedRouteSnapshot (frozen picture)
  An immutable “photo” of the route at a point in time. It doesn’t update.

- RouterState / RouterStateSnapshot
  Like above, but for the whole tree of routes, not just one node.

In guards/resolvers

Angular hands you snapshots:

```ts
// CanActivate (class or functional)
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const mustBeAdmin = route.data['adminOnly'] === true;
  return mustBeAdmin ? this.auth.isAdmin$ : true;
}

// Resolver
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { ... }
```
