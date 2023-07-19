import { z } from "zod";

const makeZodSafeFetch = <TData>(
  url: string,
  schema: z.Schema<TData>
): Promise<TData> => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return schema.parse(res);
    });
};

// can be written as
// const result = makeZodSafeFetch<{
//   firstName: string;
//   lastName: string;
//   id: number;
// }>(
//   "/api/endpoint",
//   z.object({ firstName: z.string(), lastName: z.string(), id: z.number() })
// ).then((res) => {
//   console.log(res);
// });

// inferred because we passed TData to z.Schema above
const result = makeZodSafeFetch(
  "/api/endpoint",
  z.object({ firstName: z.string(), lastName: z.string(), id: z.number() })
).then((res) => {
  console.log(res);
});

export {};
