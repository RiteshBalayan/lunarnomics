import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { pk } = useParams(); // Get the pk from the URL params
  const [newsStory, setNewsStory] = useState(null);

  useEffect(() => {
    const fetchNewsStory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/capital/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNewsStory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNewsStory();
  }, [pk]);

  if (!newsStory) {
    return <div>Loading...</div>;
  }

  // Merge paragraphs and images into a single array
  const combinedContent = [...newsStory.paragraphs, ...newsStory.images];

  // Sort combined content by their order fields
  const sortedContent = combinedContent.sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{newsStory.title}</h2>
      <p className="text-lg mb-4">{newsStory.subtitle}</p>

      {/* Render paragraphs and images */}
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
  );
};

export default NewsDetail;



