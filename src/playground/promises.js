const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve("this is my resolve string");
        reject("this is my resolve string");

    }, 1500);


});

console.log('befoer');

promise.then((data) => {
    console.log(data)

}).catch((error) => {
    console.log('error: ', error);
});


// promise.then((data) => {
//     console.log(data)
//
// }, (error) => {
//     console.log('error: ', error);
// });

console.log('after');

