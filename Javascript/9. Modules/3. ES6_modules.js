/*
    we have a native keyword now called `import`
    and export with `export`
*/

const harry = "potter";
const voldemort = "He who must not be named";

function jump() {}

export function fight(char1, char2) {
  // this is called a named export
  const attack1 = Math.floor(Math.random() * char1.length);
  const attack2 = Math.floor(Math.random() * char2.length);

  return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
}

// now in html, we can do it like this
// we can add default like
// export default function fight(char1, char2) {
// then we dont need curly braces enclosing import, just this
// import fight from 'script'

{
  /*
        <script src='./script.js'></script>
        <script>
            import { fight } from 'script'
        </script>
    */
}

// still the above examples wont work

// we have to define script tag in a specific way
{
  /*
        <script type="module" src='./script.js'></script>
        <script type="module"> // saying this is an ES6 module
            import { fight } from './script.js'
        </script>
      */
}

// still wont work, as now its a module, we need to serve it from a server
// we will use live-server here

// > live-server

// NOW! IT WILL WORK!!!!
