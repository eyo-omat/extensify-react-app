import moment from "moment";
import filterReducer from "../../reducers/filters";

test("should setup default filter values", () => {
    const action = filterReducer(undefined, { type: "@@INIT" });
    expect(action).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });

});

test("should set sortBy to amount", () => {
    const action = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });
    expect(action.sortBy).toBe("amount");

});

test("should set sortBy to date", () => {
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const action = filterReducer(currentState, { type: "SORT_BY_DATE" });
    expect(action.sortBy).toBe("date");

});

test("should set startDate filter", () => {

    const action = filterReducer(undefined, { type: "SET_START_DATE", startDate: moment(0).add(2, 'days').valueOf() });
    expect(action.startDate).toBe(moment(0).add(2, 'days').valueOf());

});

test("should set endDate filter", () => {

    const action = filterReducer(undefined, { type: "SET_END_DATE", endDate: moment(0).subtract(2, 'days').valueOf() });
    expect(action.endDate).toBe(moment(0).subtract(2, 'days').valueOf());

});

test("should set text filter", () => {

    const action = filterReducer(undefined, { type: "SET_TEXT_FILTER", text: "mac" });
    expect(action.text).toBe("mac");

});
