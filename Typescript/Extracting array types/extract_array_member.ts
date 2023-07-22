const roles = [
  "user",
  "superadmin",
  "admin",
  "anonymous",
  "supersuperadmin",
] as const;

// import roles from "./roles.json"; // not working

type RolesArray = typeof roles;

// type User = RolesArray[0 | 1 | 2 | 3];
type User = RolesArray[number]; // so cool
// roles are in unordered set, so can be random
