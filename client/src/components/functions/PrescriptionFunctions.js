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

export const getPrescription = prescription => {
    return axios
        .post('prescriptions/get', {
            id: prescription.id
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
