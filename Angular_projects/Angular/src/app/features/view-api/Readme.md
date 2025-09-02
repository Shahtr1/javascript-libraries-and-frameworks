W**hat is Happening Overall?**

- The ViewApi component demonstrates advanced Angular view APIs by:
  1.  Using a reusable child component (`SlotCardComponent`) with customizable header and footer templates.
  2.  Dynamically interacting with the child component using `@ViewChild`.
  3.  Managing a list of items and dynamically updating the DOM using `@ViewChildren`.
  4.  Dynamically inserting and clearing content (like a banner) using `ViewContainerRef` and `TemplateRef`.

Step-by-Step Flow

1. Parent Component (ViewApi) Initialization

```ts
items: Item[] = [
  { id: 1, name: 'Alpha', price: 1299 },
  { id: 2, name: 'Bravo', price: 2599 },
];
```

- Purpose: This list is displayed inside the card's body using an \*ngFor loop.
- Dynamic Updates: The list can be updated by adding new items.

Child Component Reference (`@ViewChild`)
The `@ViewChild` decorator is used to get a reference to the SlotCardComponent instance:

What It Does:

- Finds the `<app-slot-card>` element with the #card template reference in the parent template.
- Stores a reference to the `SlotCardComponent` instance in the card property

Why It’s Useful:

- Allows the parent component to call methods on the child component (e.g., focusSearch()).

List Item References (`@ViewChildren`)
The `@ViewChildren` decorator is used to get references to all `<li>` elements in the list:

Why It’s Useful:

- Allows the parent component to count or manipulate the list items dynamically

Dynamic Content Insertion (ViewContainerRef and TemplateRef)
The @ViewChild decorator is used to get references to:

1.  Dynamic Host:

    What It Does:
    - Finds the `<ng-template #dynamicHost>` element in the parent template.
    - Stores a reference to its ViewContainerRef, which acts as a placeholder for dynamically inserted content.
      Why It’s Useful:
    - Allows the parent component to insert or clear dynamic content.

2.  Banner Template:

    What It Does:
    - Finds the `<ng-template #banner>` element in the parent template.
    - Stores a reference to its `TemplateRef`, which represents the banner content.

    Why It’s Useful:
    - Allows the parent component to render the banner dynamically.

In Angular, the static property is used in queries like `@ViewChild` or `@ContentChild` to determine when the query should be resolved. It can be set to either true or false, and its value affects when the query is initialized during the component lifecycle.

- `static: true`
  The query is resolved once during the ngOnInit lifecycle hook.
  Use this when you need to access the queried element or directive immediately after the component is initialized.
  This is typically used when the queried element or directive is always present in the DOM and does not depend on structural directives like `*ngIf` or `*ngFor`.
- `static: false`
  The query is resolved after Angular's change detection runs, during the `ngAfterViewInit` or `ngAfterContentInit` lifecycle hooks.
  Use this when the queried element or directive might be added or removed dynamically (e.g., inside an `*ngIf` or `*ngFor` block).
  This ensures that the query is resolved only when the DOM is stable and all dynamic changes are accounted for.
