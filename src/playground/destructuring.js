console.log("destructuring");

const person = {
    name: "Eyioyo",
    age: 28,
    location: {
        city: "Festac",
        temp: 87

    }


};

const {name, age} = person;

console.log(`${name} is ${age}`);

const {city, temp} = person.location;
if (city && temp) {
    console.log(`Its ${temp} in ${city}`)
}

const book = {
    title: "Ego is the enemy",
    author: "Ryan Holiday",
    publisher: {
        //name: "penguin"

    }
};

const {name: publisherName = "Self Published" } = book.publisher;

console.log(publisherName);

// Array Destructuring

const address = ["432 jupiter avenue", "Lahos", "Lagod", "98337"];

const [, cit, state] = address;

console.log(`You are in ${cit}, ${state}.`);

const item = ["Coffee (Brewed black)", "$2.00", "$2.50", "$2.75"];

const [coffee, , price] = item;

console.log(`A medium ${coffee} costs a lot, like ${price}`);

