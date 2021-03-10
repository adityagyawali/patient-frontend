//TODO
// 9.22: patientor, step7
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants'
import { useStateValue, getSinglePatient } from '../state';
const PatientInfo = () => {
  const [{patient}, dispatch] = useStateValue()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | []>([])
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

  useEffect(() => {
    const getdiagnosesData = async () => {
      console.log('running')
      try {
        const {data} = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
          );
          console.log('daat',data)
        setDiagnoses(data)
      } catch (e) {
        console.error(e);
      }
    };
    void getdiagnosesData();
  }, []);

  console.log(diagnoses)
  return (
    <div>
      <h1>{patient.name}</h1>
      {
        patient.entries.length > 0 &&
        <>
          <h5>entries</h5>
          <div>
            {patient.entries.map((entry: Entry) => (
              <div key={id}>
                <p>{entry.description}</p>
                <ul>
                  {entry.diagnosisCodes?.map((code) => (
                    <>
                      <li key={code}>{code}</li> <span>{diagnoses.length > 0 && diagnoses.find((item) => item.code === code)?.name}</span>
                    </>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default PatientInfo;
