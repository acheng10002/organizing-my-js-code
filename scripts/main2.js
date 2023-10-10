// the User class definition is not imported into the HTML, instead it's imported here
// the import allows me change the name of the default imported object
// to import non-default things, put them in curly brackets
// import U, {printName, printAge} from '/es6-modules.js'
// to rename the function
import U, {printName as printUserName, printAge as printUserAge} from '/es6-module.js'

const user = new U("Bob", 11)
console.log(user) // User {name: "Bob", age: 11}
                   //    age: 11
                   //    name: "Bob"

printUserName(user)
printUserAge(user)

/* only 80% of modern browsers support import and export statements
   so, gotta use something like Babel to convert the import and export statements and other modern features into older JS */