import authReducer from '../../reducers/auth';

test("should set default state", () => {
    const state = authReducer(undefined, { type: "@@INIT"});
    expect(state).toEqual({});

});

test("should set login state", () => {
    const state = authReducer(undefined, { type: "LOGIN", uid: "234hdgg"});
    expect(state.uid).toBe("234hdgg");

});

test("should set logout state", () => {
    const state = authReducer(undefined, { type: "LOGOUT"});
    expect(state).toEqual({});

});
