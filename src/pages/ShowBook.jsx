/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-app-backend-silk.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 '>
      <BackButton />
      <h1 className='text-4xl my-4 text-center'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-4 m-auto border-green-500 rounded-xl w-fit p-4'>

          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Id :</span>
            <span className="font-medium">{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Title :</span>
            <span className="font-medium">{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Author :</span>
            <span className="font-medium">{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Publish Year :</span>
            <span className="font-medium">{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Create Time</span>
            <span className="font-medium">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black font-bold'>Last Update Time</span>
            <span className="font-medium">{new Date(book.updatedAt).toString()}</span>
          </div>
          </div>
      )}
    </div>
  );
};

export default ShowBook;
