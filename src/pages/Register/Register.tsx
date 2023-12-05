// File: FirstPage.tsx

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (formData.name && formData.phoneNumber && formData.email) {
      alert(formData.name + ",your data has been saved")
      // Save data to localStorage
      localStorage.setItem('userData', JSON.stringify(formData));

      // Redirect to the second page
      navigate('/departments');
    } else {
      alert('Please enter all details before proceeding.');
    }
  };

  return (
    <>
      <div className=' max-w-[650px] p-4 mx-auto'>

        <div className='border w-full h-auto mt-[4rem] px-4 py-2 border-blue-400'>
          <h1 className='text-3xl text-center my-4'>Register</h1>
          <form className='my-4  w-full flex flex-col justify-center' onSubmit={handleSubmit}>
            <div className='flex items-center justify-between mt-4 w-full'>
              <TextField 
                onChange={handleChange} name="name" required label="Name"  className='w-full' variant="outlined" />

            </div>
            <div className='flex items-center justify-between mt-4 w-full'>
              <TextField
                onChange={handleChange} name="phoneNumber" type='number' required label="Phone Number" className='w-full' variant="outlined" />

              
            </div>
            <div className='flex items-center justify-between my-4  w-full'>
            <TextField
                onChange={handleChange} name="email" type='email' required label="Email" className='w-full' variant="outlined" />

            </div>
            <Button type='submit' variant="contained">Submit </Button>

          </form>
        </div>
      </div>

    </>

  );
};

export default Register;
