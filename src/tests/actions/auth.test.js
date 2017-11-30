import {login, logout} from '../../actions/auth';


test("should setup login action object", () => {
    const action = login("123ead");
    expect(action).toEqual({
        type: "LOGIN",
        uid: "123ead"
    });

});

test("should setup logout action object", () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    });

});