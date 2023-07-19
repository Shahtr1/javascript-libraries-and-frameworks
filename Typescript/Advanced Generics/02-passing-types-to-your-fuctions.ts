// A generic function
const makeFetch = <TData>(url: string): Promise<TData> => {
  return fetch(url).then((res) => res.json());
};

makeFetch<{ firstName: string }>("/api/endpoint").then((res) => {
  // res would be of any type
  console.log(res);
});
