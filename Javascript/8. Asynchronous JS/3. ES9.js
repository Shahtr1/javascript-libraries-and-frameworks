// Object spread operator
const animals = {
  tiger: 23,
  lion: 5,
  monkey: 2,
};

const { tiger, ...rest } = animals;

console.log(rest);

/*
    {
        "lion": 5,
        "monkey": 2
    }
*/

// ============================================================
// Previously we had for arrays, like below
// ============================================================

const array = [1, 2, 3, 4, 5];
function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

sum(...array);

// ============================================================
// Two other new features in ES9
// ============================================================

// finally
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch(() => console.log)
  .finally(() => {
    console.log("logged either way");
  });

//   ---------------------------------------------------------------

// for await of
const urls2 = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  const [users, posts, albums] = await Promise.all(
    urls2.map(async (url) => {
      const response = await fetch(url);
      return response.json();
    })
  );

  console.log(users);
  console.log(posts);
  console.log(albums);
};

// can be changed to

const getData2 = async function () {
  const arrayOfPromises = urls.map((url) => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};

getData2();
