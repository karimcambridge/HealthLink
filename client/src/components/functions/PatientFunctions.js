import axios from 'axios';

export const create = newPatient => {
    return axios
        .post('patients/create', {
            national_id: newPatient.national_id,
            title: newPatient.title,
            first_name: newPatient.first_name,
            last_name: newPatient.last_name,
            dob: newPatient.dob,
            contact_information: newPatient.contact_information,
            address: newPatient.address,
        })
        .then(response => {
            console.log(`Created patient ${newPatient.title} ${newPatient.first_name} ${newPatient.last_name} (${newPatient.national_id}).`);
        });
};

export const getPatient = patient => {
    return axios
        .post('patients/get', {
            id: patient.id
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
