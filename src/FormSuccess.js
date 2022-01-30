import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>Akun berhasil terdaftar! Silahkan klik disini</h1>
        <a href='/login'>
      <img className='form-img-2' src='img/img.png' alt='success-image' />
      </a>
    </div>
  );
};

export default FormSuccess;