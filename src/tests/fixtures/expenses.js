import moment from 'moment';

export default [{
    id: "1",
    description: "A new description",
    note: "A new note",
    amount: 4500,
    createdAt: 0
}, {
    id: "2",
    description: "Mac",
    note: "",
    amount: 450,
    createdAt: moment(0).add(4, 'days').valueOf()
}, {
    id: "3",
    description: "Credit card",
    note: "visa",
    amount: 3,
    createdAt: moment(0).add(24, 'days').valueOf()
}, {
    id: "4",
    description: "Gum",
    note: "Chewy",
    amount: 5,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}];
