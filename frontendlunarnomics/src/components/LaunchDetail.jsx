import React, { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import AnimatedNumber from './AnimatedNumber';

const LaunchDetail = ({ type }) => {
  const { id } = useParams(); // Get the pk from the URL params
  const [detail, setdetail] = useState(null);
  
  useEffect(() => {
    const fetchdetail = async () => {
      try {
        const response = await fetch(`https://jpb2viz63a.ap-south-1.awsapprunner.com/api/launch/${id}`);
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


    // Merge paragraphs and images into a single array
    const combinedContent = [...detail.article.paragraphs, ...detail.article.images];

    // Sort combined content by their order fields
    const sortedContent = combinedContent.sort((a, b) => a.order - b.order);




  const current_launch_serial = detail.launch_serial_number;
  const total_launch = detail.total_launches;



  if (type === 'main') {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">


    <div className="flex justify-between w-full py-4">
      {current_launch_serial !== 1 && (
        <a href={`/page/launch/${current_launch_serial - 1}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next Mission
          </button>
        </a>
      )}
      {current_launch_serial !== total_launch && (
        <a href={`/page/launch/${current_launch_serial + 1}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Previous Mission
          </button>
        </a>
      )}
    </div>


    <h2 className="text-3xl font-bold mb-4 text-blue-600">{detail.name}</h2>
    <p className="text-lg font-semibold text-gray-700">Objective: <span className="text-lg text-orange-800">{detail.objective}</span></p>

    <div className="lg:hidden">

    <p class="text-lg font-semibold text-gray-700">
        Launch Date:
        <span class="flex flex-row text-blue-800 space-x-2">
        <span class="w-20 text-center shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(8, 10)} /> Day
        </span>
        <span class="w-20 text-center shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(5, 7)} /> Month
        </span>
        <span class="w-40 text-center centered shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(0, 4)} /> Year
        </span>
        </span>
      </p>
      <p className="text-lg font-semibold text-gray-700">Mission Length: <span className="text-lg text-green-800">{detail.mission_length}</span></p>
      <p className="text-lg font-semibold text-gray-700">Launch Vehicle: <span className="text-lg text-purple-800">{detail.launch_vehicle}</span></p>
      <p className="text-lg font-semibold text-gray-700">Status: <span className="text-lg text-red-800">{detail.status}</span></p>

    {detail.technology && detail.technology.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Technology</h3>
        {detail.technology.map(tech => (
          <p key={tech.id} className="inline-flex items-center text-lg text-orange-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-orange-100">{tech.name}</p>
        ))}
      </div>
    )}

    {detail.project && detail.project.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Project</h3>
        {detail.project.map(proj => (
          <Link to={`/page/project/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-red-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}

{detail.primary_owner && detail.primary_owner.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Primary Owner</h3>
        {detail.primary_owner.map(owner => (
          <div key={owner.id}>
            <Link to={`/page/company/${owner.id}`}>
            <p className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-green-100">{owner.name}</p>
            </Link>
            {/* Render other fields if needed */}
          </div>
        ))}
      </div>
    )}

    {detail.secondary_owner && detail.secondary_owner.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Secondary Owner</h3>
        {detail.secondary_owner.map(owner => (
          <div key={owner.id}>
            <Link to={`/page/company/${owner.id}`}>
            <p className="inline-flex items-center text-lg text-purple-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-purple-100">{owner.name}</p>
            </Link>
            {/* Render other fields if needed */}
          </div>
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

      <p class="text-lg font-semibold text-gray-700">
        Launch Date:
        <span class="flex flex-row text-blue-800 space-x-2">
        <span class="w-20 text-center shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(8, 10)} /> Day
        </span>
        <span class="w-20 text-center shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(5, 7)} /> Month
        </span>
        </span>
        <span class="flex flex-row text-blue-800 space-x-2">
        <span class="w-40 text-center centered shrink-0">
          <AnimatedNumber targetNumber={detail.launch_date.slice(0, 4)} /> Year
          </span>
        </span>
      </p>
      <p className="text-lg font-semibold text-gray-700">Mission Length: <span className="text-lg text-green-800">{detail.mission_length}</span></p>
      <p className="text-lg font-semibold text-gray-700">Launch Vehicle: <span className="text-lg text-purple-800">{detail.launch_vehicle}</span></p>
      <p className="text-lg font-semibold text-gray-700">Status: <span className="text-lg text-red-800">{detail.status}</span></p>
      
    {detail.technology && detail.technology.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Technology</h3>
        {detail.technology.map(tech => (
          <p key={tech.id} className="inline-flex items-center text-lg text-orange-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-orange-100">{tech.name}</p>
        ))}
      </div>
    )}

    {detail.project && detail.project.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Project</h3>
        {detail.project.map(proj => (
          <Link to={`/page/project/${proj.id}`}>
          <p key={proj.id} className="inline-flex items-center text-lg text-red-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-red-100">{proj.name}</p>
          </Link>
        ))}
      </div>
    )}

    {detail.primary_owner && detail.primary_owner.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Primary Owner</h3>
        {detail.primary_owner.map(owner => (
          <div key={owner.id}>
            <Link to={`/page/company/${owner.id}`}>
            <p className="inline-flex items-center text-lg text-green-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-green-100">{owner.name}</p>
            </Link>
            {/* Render other fields if needed */}
          </div>
        ))}
      </div>
    )}

    {detail.secondary_owner && detail.secondary_owner.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Secondary Owner</h3>
        {detail.secondary_owner.map(owner => (
          <div key={owner.id}>
            <Link to={`/page/company/${owner.id}`}>
            <p className="inline-flex items-center text-lg text-purple-700 border border-2 border-gray-300 rounded-full px-3 py-1 hover:bg-purple-100">{owner.name}</p>
            </Link>
            {/* Render other fields if needed */}
          </div>
        ))}
      </div>
    )}

    </div>

    )};

};

export default LaunchDetail;