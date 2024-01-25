import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStudent, getStudentByUsername, updateStudent } from '../services/studentData';
import AuthorProfile from '../components/AuthorProfile';

function AuthorProfilePage() {
  const { username } = useParams();
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const data = await getStudentByUsername();
        setAuthorData(data);
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthorData();
  }, [username]);

  return (
    <div>
      <h1>Author Profile Page</h1>
      {authorData && (
        <AuthorProfile
          username={authorData.username}
          name={authorData.name}
          university={authorData.university}
          githubUsername={authorData.githubUsername}
          linkedInUsername={authorData.linkedInUsername}
        />
      )}
    </div>
  );
}

export default AuthorProfilePage;
