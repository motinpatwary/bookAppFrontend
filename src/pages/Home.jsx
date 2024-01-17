/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://book-app-backend-silk.vercel.app/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-12'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl my-8 font-medium'>Books Store Application</h1>
        <Link to='/books/create'>
        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Book</button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (<table className='w-full border-collapse'>
      <thead>
        <tr className='text-lg'>
          <th className='border-2 p-3 border-slate-600 rounded-md'>No</th>
          <th className='border-2 p-3 border-slate-600 rounded-md'>Title</th>
          <th className='border-2 p-3 border-slate-600 rounded-md max-md:hidden'>
            Author
          </th>
          <th className='border-2 p-3 w-52 border-slate-600 rounded-md max-md:hidden'>
            Publish Year
          </th>
          <th className='border-2 p-3 w-80 border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center font-medium'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center font-medium'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden font-medium'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden font-medium'>
              {book.publishYear}
            </td>
            <td className='border border-slate-700 rounded-md text-center font-medium'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Show</button>
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  
                  <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 mb-1 dark:focus:ring-yellow-900">Edit</button>
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mt-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>)}
    </div>
  );
};

export default Home;
