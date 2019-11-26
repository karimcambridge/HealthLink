import axios from 'axios';

export const create = newPrescription => {
    return axios
        .post('prescriptions/create', {
            data: newPrescription.data,
            patient_id: newPrescription.patient_id,
        })
        .then(response => {
            console.log(`Created prescription ${newPrescription.patient_id} ${newPrescription.data}.`);
        });
};


export const getAllPrescriptions = () => {
    return axios
        .get('prescriptions/getall')
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getPrescription = patient => {
    return axios
        .get('prescriptions/get', {
            id: patient.id
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
