import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import { Patient } from '../types';
import { apiBaseUrl } from '../constants'
import { useStateValue, getSinglePatient } from '../state';
const PatientInfo = () => {
  const [{patient}, dispatch] = useStateValue()
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    const getPatientInfo = async () => {
      console.log('running')
      try {
        const {data} = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
          );
        dispatch(getSinglePatient(data));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatientInfo();
  }, [id]);
  console.log(patient)
  return (
    <div>
      <h1>{patient.name}</h1>
    </div>
  );
};

export default PatientInfo;
