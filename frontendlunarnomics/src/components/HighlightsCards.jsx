import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HighlightsCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/article/');
        const jsonData = await response.json();
        setData(shuffleArray(jsonData).slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="flex flex-wrap mt-10">
      {data.slice(0, 4).map((article, index) => (
        <Link
          key={index}
          to={`/page/${article.type}/${article.identity_number}`}
          className="w-1/2 h-64 md:w-1/2 lg:w-1/3 border border-gray-400"
        >
          <div className="h-full relative">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-opacity-75 bg-gray-800 text-white p-2">
              <h2 className="text-lg font-semibold">{article.title}</h2>
            </div>
          </div>
        </Link>
      ))}
      {data.slice(4, 6).map((article, index) => (
        <Link
          key={index + 4}
          to={`/page/${article.type}/${article.identity_number}`}
          className="hidden lg:block w-1/2 h-64 md:w-1/2 lg:w-1/3 border border-gray-400"
        >
          <div className="h-full relative">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-opacity-75 bg-gray-800 text-white p-2">
              <h2 className="text-lg font-semibold">{article.title}</h2>
            </div>
          </div>
        </Link>
      ))}
      {[...Array(6 - data.length)].map((_, index) => (
        <div
          key={index + data.length}
          className={`${
            index + data.length < 4
              ? 'w-1/2 h-64 md:w-1/2 lg:w-1/3 p-4 border border-gray-400'
              : 'hidden lg:block w-1/2 h-64 md:w-1/2 lg:w-1/3 p-4 border border-gray-400'
          }`}
        >
          <div className="h-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default HighlightsCards;
