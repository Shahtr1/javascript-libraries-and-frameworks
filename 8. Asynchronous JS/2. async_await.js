// ASYNC AWAIT

// ES8
// It makes code easier to read

movePlayer(100, "Left")
  .then(() => movePlayer(400, "Left"))
  .then(() => movePlayer(10, "Right"))
  .then(() => movePlayer(330, "Left"));

// with sync await it would look like this

// goal of async await is make the code look synchronous
// they are promises under the hood

// await says, pause this function till i have sth for you

async function playerStart() {
  const first = await movePlayer(100, "Left"); // pause
  const second = await movePlayer(400, "Left"); // pause
  await movePlayer(10, "Right"); // pause
  await movePlayer(330, "Left"); // pause
}

// ==================================================================
// Example 1
// ==================================================================

fetch("https://jsonplaceholder.typicode.com/users")
  .then((resp) => resp.json())
  .then(console.log);

// can be changed to
async function fetchUsers() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await resp.json();
  console.log(data);
}

// ==================================================================
// Example 2
// ==================================================================

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      })
    );

    console.log(users);
    console.log(posts);
    console.log(albums);
  } catch {
    console.log("oops");
  }
};
