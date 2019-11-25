import axios from 'axios';

export const create = newPatient => {
    return axios
        .post('patients/create', {
            national_id: newPatient.national_id,
            first_name: newPatient.first_name,
            last_name: newPatient.last_name,
        })
        .then(response => {
            console.log(`Created patient ${newPatient.first_name} ${newPatient.last_name} (${newPatient.national_id}).`);
        });
};

export const getPatient = patient => {
    return axios
        .post('patients/get', {
            national_id: patient.national_id
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
