import React, { useEffect, useState } from 'react';
import DeparmentFrom from '../components/Deparment/DeparmentFrom/DeparmentFrom';
import DeparmentTable from '../components/Deparment/DeparmentTablet/DeparmentTable';
import axios from 'axios';
import { getAuthHeader } from '../Utils/Auth';

const Department = () => {
  const [departmentList, setDepartmentList] = useState([]);

  const fetchDepartmentList = async () => {
    try {
      const response = await axios.get("https://herramientas-ucv-19.onrender.com/api/ucv/deparmentList",{
        headers: getAuthHeader(),
      });
      setDepartmentList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  const handleDeparmentChanged = () => {
    fetchDepartmentList();
  };

  return (
    <>
      <DeparmentFrom onDeparmentChanged={handleDeparmentChanged}/>
      <DeparmentTable departmentList={departmentList}/>
    </>
  );
};

export default Department;
