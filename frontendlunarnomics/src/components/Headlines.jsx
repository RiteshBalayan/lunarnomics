import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Headlines = () => {
  const [selectedCategory, setSelectedCategory] = useState('article');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const fetchData = async (category) => {
    try {
      let apiUrl = '';
      switch (category) {
        case 'article':
          apiUrl = 'https://jpb2viz63a.ap-south-1.awsapprunner.com/api/article/general/';
          break;
        case 'news_story':
          apiUrl = 'https://jpb2viz63a.ap-south-1.awsapprunner.com/api/news/';
          break;
        case 'investment_news':
          apiUrl = 'https://jpb2viz63a.ap-south-1.awsapprunner.com/api/article/capital/';
          break;
        default:
          apiUrl = 'https://jpb2viz63a.ap-south-1.awsapprunner.com/api/article/general/';
          break;
      }
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      console.log('jsonData:', jsonData); // Log the data to inspect its structure
      setData(jsonData.results); // Set data to jsonData.results
      setTotalPages(jsonData.total_pages || 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='mt-10'>

        <div className="flex justify-between">
            <button
            className={`flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ${
                selectedCategory === 'article' ? 'bg-blue-700' : ''
            }`}
            onClick={() => handleCategoryChange('article')}
            >
            Article
            </button>
            <button
            className={`flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ${
                selectedCategory === 'news_story' ? ' bg-blue-700' : ''
            }`}
            onClick={() => handleCategoryChange('news_story')}
            >
            News Story
            </button>
            <button
            className={`flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ${
                selectedCategory === 'investment_news' ? ' bg-blue-700' : ''
            }`}
            onClick={() => handleCategoryChange('investment_news')}
            >
            Investment News
            </button>
        </div>




      <div className='mt-10'>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
            {selectedCategory === 'news_story' ? (
              // Add a conditional link for the 'news_story' category
              <Link to={`/page/news/${item.pk}`}>
                    <div key={index} className="flex border border-gray-300 rounded-lg mt-4">
                      {/* Left Side (Thumbnail or "NEWS") */}
                      <div className="flex-shrink-0 w-60 h-60 bg-gray-200 flex items-center justify-center">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl font-semibold text-gray-600">NEWS</span>
                        )}
                      </div>
                      {/* Right Side (Content) */}
                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <h4 className="text-lg mb-2">{item.subtitle}</h4>
                        <p className="text-gray-600">Author: {item.author_name}</p>
                        <p className="text-gray-600">Publish Date: {item.publish_date}</p>
                      </div>
                    </div>
              </Link>
            ) : selectedCategory === 'article' ? (
              // Add a conditional link for the 'article' category
              <Link to={`/page/general/${item.pk}`}>
                    <div key={index} className="flex border border-gray-300 rounded-lg mt-4">
                      {/* Left Side (Thumbnail or "NEWS") */}
                      <div className="flex-shrink-0 w-60 h-60 bg-gray-200 flex items-center justify-center">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl font-semibold text-gray-600">NEWS</span>
                        )}
                      </div>
                      {/* Right Side (Content) */}
                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <h4 className="text-lg mb-2">{item.subtitle}</h4>
                        <p className="text-gray-600">Author: {item.author_name}</p>
                        <p className="text-gray-600">Publish Date: {item.publish_date}</p>
                      </div>
                    </div>
              </Link>
            ) : (
              // Add a conditional link for the 'investment_news' category
              <Link to={`/page/investment/${item.pk}`}>
                    <div key={index} className="flex border border-gray-300 rounded-lg mt-4">
                      {/* Left Side (Thumbnail or "NEWS") */}
                      <div className="flex-shrink-0 w-60 h-60 bg-gray-200 flex items-center justify-center">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl font-semibold text-gray-600">NEWS</span>
                        )}
                      </div>
                      {/* Right Side (Content) */}
                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      </div>
                    </div>
              </Link>
            )}
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Headlines;
