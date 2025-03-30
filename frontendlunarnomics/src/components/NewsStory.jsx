import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsHeadlines = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/news/'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">News Headlines</h2>
      <div className="grid gap-4">
        {newsData.map((newsStory, index) => (
            <Link to={`page/news/${newsStory.pk}`} key={index}>
          <div key={index} className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{newsStory.title}</h3>
            <h4 className="text-lg mb-2">{newsStory.subtitle}</h4>
            <p className="text-gray-600">Author: {newsStory.author_name}</p>
            <p className="text-gray-600">Publish Date: {newsStory.publish_date}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsHeadlines;
