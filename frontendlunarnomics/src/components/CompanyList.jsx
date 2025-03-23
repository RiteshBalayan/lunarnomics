import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/company/');
        const jsonData = await response.json();
        setData(jsonData);
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

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">List of Companies</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
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
                    <Link to={`/page/company/${item.id}`}>
                        <td className="px-4 py-2">{item.name}</td>
                    </Link>
                    <td className="px-4 py-2">{item.type}</td>
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
                    <Link to={`/page/company/${item.id}`}>
                        <td className="px-4 py-2">{item.name}</td>
                    </Link>
                    <td className="px-4 py-2">{item.type}</td>
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
