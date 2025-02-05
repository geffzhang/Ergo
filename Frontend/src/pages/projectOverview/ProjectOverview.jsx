import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import {Button, Select, Option} from '@material-tailwind/react';
import { Typography } from '@mui/material';
import TaskSection from './TaskSection';
import TaskDetailsModal from './TaskDetailsModal';
import ProjectSettings from './ProjectSettings';
import { MachineLearning } from 'aws-sdk';
import MachineLearningModal from './MachineLearningModal';

const ProjectOverview = () => {
  const { projectId } = useParams();
  const [currentProject, setCurrentProject] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMLOpen, setModalMLOpen] = useState(false);
  const { token, userId, username } = useUser();

  useEffect(() => {
    fetchCurrentProject();
  }, [projectId, token, userId]);
  const fetchCurrentProject = async () => {
    try {
      if (!token || !userId) return;
      const response = await api.get(`/api/v1/Projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCurrentProject({...response.data, members: currentProject.members});
      } else {
        console.error('Error fetching tasks:', response);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleOpenMLModal = () => {
    setModalMLOpen(true);
  };

  const handleCloseMLModal = () => {
    setModalMLOpen(false);
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchCurrentProject();
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end'>
        <div >
          <div>
            <span className='text-surface-light text-sm opacity-75'>Owner:</span>
            <span className='text-surface-light text-sm opacity-50 ml-1'>@{currentProject.createdBy}</span>
          </div>
          <Typography variant="h3" className='text-white'>
          {currentProject.projectName}
          </Typography>
          <div className='flex flex-col md:flex-row mt-2'>
            <Typography component="p" mr={1} className='text-surface-light font-semibold'>
              Description:
            </Typography>
            <Typography variant="body1" component="p" className='text-surface-light'>
              {currentProject.description}
            </Typography>
          </div>
          
        </div>
        <div className='flex gap-2'>
        <Button className="bg-surface-dark hover:bg-surface-mid-dark" onClick={handleOpenMLModal}  size="sm" ripple="light">
        <p className='text-center text-xs'>Predict</p></Button>
        {currentProject.createdBy === username && 
          <ProjectSettings project={currentProject} token={token}/>
        }
        </div>
        
      </div>

      <div className='flex flex-row'>
        <TaskSection
          project={currentProject}
          setProject={setCurrentProject}
          token={token}
          userId={userId}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          modalOpen={modalOpen}
        />
      </div>
      <TaskDetailsModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        token={token}
        project={currentProject}
      />
      {modalMLOpen && <MachineLearningModal modalOpen={modalMLOpen}
      handleCloseMLModal={handleCloseMLModal} token={token}/>}
    </div>
  );
};

export default ProjectOverview;