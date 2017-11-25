//child_removed
database.ref("expenses").on("child_removed", (snapshot) => {

    console.log(snapshot.key, snapshot.val());

});

//child_changed
database.ref("expenses").on("child_changed", (snapshot) => {

    console.log(snapshot.key, snapshot.val());

});

//child_added
database.ref("expenses").on("child_added", (snapshot) => {

    console.log(snapshot.key, snapshot.val());

});


// database.ref("expenses").once("value").then((snapshot) => {
//     const expenses = [];
//
//     snapshot.forEach((childSnapshot) => {
//
//         expenses.push({
//
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//
//         });
//
//     });
//
//     console.log(expenses);
//
// });

// database.ref("expenses").on("value", (snapshot) => {
//     const expenses = [];
//
//     snapshot.forEach((childSnapshot) => {
//
//         expenses.push({
//
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//
//         });
//
//     });
//
//     console.log(expenses);
//
// });

// database.ref("expenses").push({
//     id: "1",
//     description: "A new description",
//     note: "A new note",
//     amount: 4500,
//     createdAt: 0
//
// });


// database.ref("notes").push({
//     title: 'Life hack',
//     body: 'Get a life'
//
// });


// const onValueChange = database.ref("expenses").on('value', (snapshot) => {
//     const data = snapshot.val();
//     const name = data.name;
//     const job = data.job.title;
//     const city = data.location.city;
//     console.log(name + ' is a ' + job + ' at ' + city);
// }, (error) => {
//     console.log('error retrieving ', error);
// });
//
// setTimeout(() => {
//     database.ref("expenses").child('name').set("Messi");
//
// }, 3500);


// setTimeout(() => {
//     //database.ref("expenses").off(onValueChange);
//
// }, 7000);


// setTimeout(() => {
//     database.ref("expenses").child('age').set(29);
//
// }, 10500);

// database.ref("expenses").child("location").once('value'  ).then((snapshot) => {
//     const data = snapshot.val();
//     console.log('data once retrieved ', data);
// }).catch((error) => {
//     console.log('error: ', error);
// });


// database.ref("expenses").set({
//     name: "Eyioyo",
//     age: 27,
//     stressLevel: 77,
//     job: {
//         title: "Software Developer",
//         company: "Google"
//     },
//     location: {
//         city: "Jos",
//         country: "Nigeria"
//     }
//
// }).then(() => {
//     console.log('data is saved ');
// }).catch((error) => {
//     console.log('error: ', data);
// });
//
// database.ref("expenses").child('age').set(29);
// database.ref("expenses").child('location/city').set("lagos");
//
// database.ref("expenses").child('attribute').set(
//     {
//         height: 56,
//         weight: 60
//
//     }).then((data) => {
//     console.log('Second saved data');
// }).catch((error) => {
//     console.log('error: ', error);
// });

//database.ref("expenses").set("This is my data");
// database.ref("expenses").child("isSingle").remove(() => {
//     console.log('is single field deleted');
// }).catch((error) => {
//     console.log('error: ', error);
// });

// database.ref("expenses").update({
//
//     stressLevel: 9,
//     'job/company': "Amazon",
//     'location/city': 'Seattle'
//
// });

