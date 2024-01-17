/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-app-backend-silk.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl my-8 flex justify-center'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-4 border-green-500 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl font-bold'>Are You want to delete the book...🤔???</h3>

        <button
          className='p-3 bg-red-600 text-white m-8 w-60 font-medium rounded-full'
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default DeleteBook;
