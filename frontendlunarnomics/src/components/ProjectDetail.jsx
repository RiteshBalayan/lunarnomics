import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams(); // Get the pk from the URL params
  const [detail, setdetail] = useState(null);

  useEffect(() => {
    const fetchdetail = async () => {
      try {
        const response = await fetch(`https://jpb2viz63a.ap-south-1.awsapprunner.com/api/project/${id}`);
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

  // Sort paragraphs and images by their order fields if detail.article exists
  const sortedParagraphs = detail.article && detail.article.paragraphs
    ? detail.article.paragraphs.sort((a, b) => a.order - b.order)
    : [];
  const sortedImages = detail.article && detail.article.images
    ? detail.article.images.sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{detail.name}</h2>
      {/* Render paragraphs */}
      {sortedParagraphs.map(paragraph => (
        <div key={paragraph.id} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{paragraph.title}</h3>
          <p>{paragraph.content}</p>
        </div>
      ))}

      {/* Render images */}
      {sortedImages.map(image => (
        <div key={image.id} className="mb-4">
          <img src={image.image} alt={image.caption} className="mb-2" />
          <p className="text-sm text-gray-600">{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetail;