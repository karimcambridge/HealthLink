import axios from 'axios';

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
            title: newUser.title,
            role: newUser.role
        })
        .then(response => {
            console.log(`Registered with ${newUser.email}.`);
        });
};

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (!response.data.hasOwnProperty('error')) {
                localStorage.setItem('usertoken', response.data);
            }
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getUserToken = () => {
    const jwtToken = localStorage.getItem('usertoken');
    return jwtToken ? localStorage.usertoken : false;
};

export const isAuthenticated = () => {
    return getUserToken() ? true : false;
};

export const logOut = () => {
    localStorage.removeItem('usertoken');
};
