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
            //console.log(JSON.stringify(response));
            if (response.hasOwnProperty('error')) {
                return response;
            } else {
                localStorage.setItem('usertoken', response.data);
                return response.data;
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const getUserToken = () => {
    return localStorage.usertoken;
};

export const isAuthenticated = () => {
    return localStorage.usertoken ? true : false;
};

export const logOut = () => {
    localStorage.removeItem('usertoken');
};
