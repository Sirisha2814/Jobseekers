// AddOpening.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openingService from '@/features/opening/openingService';
import axios from 'axios';
import { getOpenings } from '@/features/opening/openingSlice';
import { toast } from 'react-toastify';

const AddOpening = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [experience, setExperience] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSave = async () => {
    try {
      const openingData = {
        jobTitle,
        department,
        specialization,
        location,
        isRemote,
        experience,
        keywords,
        skills,
        jobDescription,
      };

      // Use openingService to create an opening
      const response = await openingService.createOpening(openingData, user.token);

      if (response) {
        // Update the local state with the new opening
        dispatch(getOpenings());

        // Clear form fields
        setJobTitle('');
        setDepartment('');
        setSpecialization('');
        setLocation('');
        setIsRemote(false);
        setExperience('');
        setKeywords([]);
        setSkills('');
        setJobDescription('');

        // Display success toast
        toast.success('Opening created successfully');
        
        // Close the AddOpening modal
        onClose();
      } else {
        // Display error toast for unsuccessful response from openingService
        toast.error('Failed to create opening');
      }
    } catch (error) {
      // Display error toast for unexpected errors
    //   console.error('Error:', error);
    //   toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="offcanvas">
      <label>
        Job Title:
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          minLength={6}
          maxLength={40}
        />
      </label>

      <label>
        Department:
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          {/* Add other department options as needed */}
        </select>
      </label>

      <label>
        Specialization:
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Select Specialization</option>
          {/* Add specialization options based on the selected department */}
        </select>
      </label>

      <label>
        Location:
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={isRemote}
        >
          <option value="">Select Location</option>
          {/* Add location options as needed */}
        </select>
      </label>

      <label>
        Is Remote:
        <input
          type="checkbox"
          checked={isRemote}
          onChange={() => setIsRemote(!isRemote)}
        />
      </label>

      <label>
        Experience:
        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="">Select Experience</option>
          {/* Add experience options as needed */}
        </select>
      </label>

      <label>
        Keywords:
        <input
          type="text"
          value={keywords.join(',')}
          onChange={(e) => setKeywords(e.target.value.split(','))}
        />
      </label>

      <label>
        Skills:
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </label>

      <label>
        Job Description:
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          minLength={50}
          maxLength={2000}
        />
      </label>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleSave()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddOpening;
