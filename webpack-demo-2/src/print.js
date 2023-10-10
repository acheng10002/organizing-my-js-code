export default function printMe() {
    // console.log('I get called from print.js!');
    // in index.html file, the Uncaught ReferenceError contains a reference to a file (print.js) and line number (2)
    cosnole.log('I get called from print.js!')
}

/* while webpack is watching my files, remove the error I introduced earlier,
   save my file and check the terminal window,
   webpack automatically recompiles the changed module 
   I do need to refresh my browser to see the changes */