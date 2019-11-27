import axios from 'axios';
import Moment from 'moment';

const zeroPad = (num, places) => {
    return String(num).padStart(places, '0');
};

export const fixPrescription = prescription => {
    const
        data = JSON.parse(prescription.data)
    ;
    prescription.parsedData = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        drug_names: data.drug_names,
        note: data.note
    }
    prescription.created = Moment(prescription.created).utc().format('YYYY-MM-DD');
    prescription.referenceNumber = () => {
        return zeroPad(prescription.id, 10);
    };
    return prescription;
};

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
