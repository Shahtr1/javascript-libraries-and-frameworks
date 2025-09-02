import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { AuthService, Role } from 'src/app/core/auth.service';

type Mode = 'any' | 'all';

// Structural directives (the ones with *)
// They change the DOM structure by adding/removing views.
// Technically they run on an <ng-template>, and the * is just shorthand that Angular expands for you.

// <ng-template
//   [hasRole]="['user','admin']"
//   [hasRoleMode]="'all'">
//   <div>Only for both</div>
// </ng-template>

// That’s why we write *hasRole:
// we want Angular to treat the host as a template and let the directive decide whether to create/clear it.

// When the *hasRole directive is used, Angular expands it into an <ng-template> and passes control to the HasRoleDirective.

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() hasRole!: Role | Role[]; // main roles input
  @Input() hasRoleMode: Mode = 'any'; // mode input for microsyntax

  private visible = false;
  private sub?: Subscription;

  constructor(
    private tpl: TemplateRef<unknown>,
    //  What it is:

    // A reference to the template that the directive is applied to.
    // This is the content inside the directive's host element (e.g., the HTML inside the *hasRole directive).
    // Why it's needed:

    // The directive uses this TemplateRef to dynamically create or remove the template's content from the DOM based on the user's roles.
    private vcr: ViewContainerRef,
    // What it is:

    // A container that allows the directive to add or remove views (DOM elements) dynamically.
    // It acts as a placeholder in the DOM where the directive can insert or clear the content of the TemplateRef.
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    // Subscribe AFTER inputs are set to avoid default flash
    this.sub = this.auth.currentUser$
      .pipe(
        map((u) => u?.roles ?? []),
        distinctUntilChanged((a, b) => a.join('|') === b.join('|')),
      )
      .subscribe(() => this.evaluate());

    // Initial check
    this.evaluate();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private evaluate() {
    const required = Array.isArray(this.hasRole)
      ? this.hasRole
      : [this.hasRole];
    const userRoles = this.auth.snapshot()?.roles ?? [];

    const ok =
      required.length === 0
        ? true
        : this.hasRoleMode === 'all'
          ? required.every((r) => userRoles.includes(r))
          : required.some((r) => userRoles.includes(r));

    if (ok && !this.visible) {
      this.vcr.clear();
      this.vcr.createEmbeddedView(this.tpl);
      this.visible = true;
    } else if (!ok && this.visible) {
      this.vcr.clear();
      this.visible = false;
    }
  }
}
