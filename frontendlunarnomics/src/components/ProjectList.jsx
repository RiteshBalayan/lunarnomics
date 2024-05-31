import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jpb2viz63a.ap-south-1.awsapprunner.com/api/project/');
        const jsonData = await response.json();
                // Format dates
                const formattedData = jsonData.map(item => ({
                  ...item,
                  formattedDate: formatDate(item.start_date)
                }));
                setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
  };

  // Function to format date as "Month Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">List of Projects</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {expanded
              ? data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                    <Link to={`/page/project/${item.id}`}>{item.name}</Link>
                    </td>
                    <td className="px-4 py-2">{item.formattedDate}</td>
                  </tr>
                ))
              : data.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                    <Link to={`/page/project/${item.id}`}>{item.name}</Link>
                    </td>
                    <td className="px-4 py-2">{item.formattedDate}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {!expanded ? (
        <button
          className="mt-4 px-2 py-1 italic underline text-blue-500 rounded-md hover:bg-blue-100 hover:text-blue-600"
          onClick={handleExpand}
        >
          Expand
        </button>
      ) : (
        <button
          className="mt-4 px-2 py-1 italic underline text-red-500 rounded-md hover:bg-red-100 hover:text-red-600"
          onClick={handleCollapse}
        >
          Collapse
        </button>
      )}
    </div>
  );
};

export default TableComponent;