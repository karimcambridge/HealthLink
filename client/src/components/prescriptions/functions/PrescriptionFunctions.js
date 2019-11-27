import axios from 'axios';

export const create = newPrescription => {
    return axios
        .post('create', {
            data: newPrescription.data,
            patient_id: newPrescription.patient_id,
        })
        .then(response => {
            console.log(`Created prescription ${newPrescription.patient_id} ${newPrescription.data}.`);
        });
};

export const getAllPrescriptions = () => {
    return axios
        .get('getall')
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getPrescription = id => {
    id = 1;
    console.log('getPrescription: ' + id);
    return axios
        .get('get', {
            id: id
        })
        .then(response => {
            console.log('getPrescription: ' + JSON.stringify(response.data));
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
