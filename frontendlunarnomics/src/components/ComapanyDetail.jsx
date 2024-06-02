import React, { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import AnimatedNumber from './AnimatedNumber';

const CompanyDetail = ({ type }) => {
  const { id } = useParams(); // Get the pk from the URL params
  const [detail, setdetail] = useState(null);
  
  useEffect(() => {
    const fetchdetail = async () => {
      try {
        const response = await fetch(`https://jpb2viz63a.ap-south-1.awsapprunner.com/api/company/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setdetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchdetail();
  }, [id]);

  if (!detail) {
    return <div>Loading...</div>;
  }


  // Merge paragraphs and images into a single array, if article exists
  const combinedContent = detail.article 
    ? [...detail.article.paragraphs, ...detail.article.images] 
    : [];

  // Sort combined content by their order fields
  const sortedContent = combinedContent.sort((a, b) => a.order - b.order);



  if (type === 'main') {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

    <h2 className="text-3xl font-bold mb-4 text-blue-600">{detail.name}</h2>
    <p className="text-lg font-semibold text-gray-700">Objective: <span className="text-lg text-orange-800">{detail.objective}</span></p>

    <div className="lg:hidden">

    <p className="text-lg font-semibold text-gray-700">
      Incorporation Date:
      {detail.incorporation_date ? (
        <span className="flex flex-row text-blue-800 space-x-2">
          <span className="w-20 text-center shrink-0">
            <AnimatedNumber targetNumber={detail.incorporation_date.slice(5, 7)} /> Month
          </span>
          <span className="w-40 text-center centered shrink-0">
            <AnimatedNumber targetNumber={detail.incorporation_date.slice(0, 4)} /> Year
          </span>
        </span>
      ) : (
        <span className="text-red-600">Date not available</span>
      )}
    </p>

    <p className="text-lg font-semibold text-gray-700">Location: <span className="text-lg text-orange-800">{detail.location}</span></p>

    {detail.founder && detail.founder.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Founder</h3>
        {detail.founder.map(proj => (
          
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700  text-2xl px-3 py-1 mt-3 mr-3">{proj.name}</p>
          
        ))}
      </div>
    )}

    {detail.parent_company && detail.parent_company.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Parent Company</h3>
        {detail.parent_company.map(proj => (
          <Link to={`/page/company/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 mt-3 mr-3 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}

    {detail.daughter_company && detail.daughter_company.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Daughter Company</h3>
        {detail.daughter_company.map(proj => (
          <Link to={`/page/company/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 mt-3 mr-3 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}

    </div>

      {sortedContent.map(content => (
        <div key={content.id} className="mb-4">
          {content.content ? ( // Check if content is a paragraph
            <>
              <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
              <p>{content.content}</p>
            </>
          ) : ( // If content is an image
            <>
              <img src={content.image} alt={content.caption} className="mb-2" />
              <p className="text-sm text-gray-600">{content.caption}</p>
            </>
          )}
        </div>
      ))}


  </div>

  );}

  else if (type === 'sidebar') {
    return (
    <div className="hidden lg:block mt-10">


    <img src={detail.logo} alt={"logo"} className="mb-2" />

    <p className="text-lg font-semibold text-gray-700">
      Incorporation Date:
      {detail.incorporation_date ? (
        <span className="flex flex-row text-blue-800 space-x-2">
          <span className="w-20 text-center shrink-0">
            <AnimatedNumber targetNumber={detail.incorporation_date.slice(5, 7)} /> Month
          </span>
          <span className="w-40 text-center centered shrink-0">
            <AnimatedNumber targetNumber={detail.incorporation_date.slice(0, 4)} /> Year
          </span>
        </span>
      ) : (
        <span className="text-red-600">Date not available</span>
      )}
    </p>

    <p className="text-lg font-semibold text-gray-700">Location: <span className="text-lg text-orange-800">{detail.location}</span></p>

    {detail.founder && detail.founder.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Founder</h3>
        {detail.founder.map(proj => (
          
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700  text-2xl py-1 mt-3 mr-3">{proj.name}</p>
          
        ))}
      </div>
    )}

    {detail.parent_company && detail.parent_company.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Parent Company</h3>
        {detail.parent_company.map(proj => (
          <Link to={`/page/company/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 mt-3 mr-3 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}

    {detail.daughter_company && detail.daughter_company.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Daughter Company</h3>
        {detail.daughter_company.map(proj => (
          <Link to={`/page/company/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 mt-3 mr-3 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}



    </div>

    )};

};

export default CompanyDetail;