import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Button, Typography } from "@material-tailwind/react";
import ErgoInput from '../../widgets/form_utils/ErgoInput';
import ErgoTextarea from '../../widgets/form_utils/ErgoTextArea';
import ErgoDatePicker from '../../widgets/form_utils/ErgoDatePicker';
import api from '@/services/api';
import { toast } from "react-toastify";
import SettingsIcon from '@mui/icons-material/Settings';
import ErgoLabel from '../../widgets/form_utils/ErgoLabel';
import { useUser } from '../../context/LoginRequired';
import DeleteProjectModal from "../../common/components/DeleteProjectModal";
import { TrashIcon } from "@heroicons/react/24/solid";

const ProjectSettings = ({ project, token }) => {
    const [open, setOpen] = useState(false);
    const [githubToken, setGithubToken] = useState('');
    const [gitRepository, setGitRepository] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projDescription, setProjDescription] = useState('');
    const [projDeadline, setProjDeadline] = useState(null);
    const [githubOwner, setGithubOwner] = useState('');
    const currentUser = useUser();
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const [deletingProject, setDeletingProject] = useState({});
    
    useEffect(() => {
        if (open) {
            fetchCurrentProject();
        }
    }, [open]);

    const fetchCurrentProject = async () => {
        try {
            if (!token || !project || !project.projectId) return;

            const response = await api.get(`/api/v1/Projects/${project.projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setProjectName(data.projectName);
                setProjDescription(data.description);
                setProjDeadline(new Date(data.deadline));
                setGithubToken(data.githubToken);
                setGitRepository(data.gitRepository);
                setGithubOwner(data.githubOwner);
            } else {
                console.error('Error fetching project:', response);
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'githubToken':
                setGithubToken(value);
                break;
            case 'gitRepository':
                setGitRepository(value);
                break;
            case 'projectName':
                setProjectName(value);
                break;
            case 'description':
                setProjDescription(value);
                break;
            case 'deadline':
                setProjDeadline(value);
                break;
            case 'githubOwner':
                setGithubOwner(value);
            default:
                break;
        }
    };
    
    const handleSaveSettings = async () => {
        try {
            const response = await api.put(`/api/v1/Projects/${project.projectId}`, {
                projectId: project.projectId,
                githubOwner: githubOwner,
                projectOwner: currentUser.username,
                projectName: projectName,
                description: projDescription,
                deadline: projDeadline,
                githubToken: githubToken,
                gitRepository: gitRepository,
                state: 0
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                handleClose();
                toast.success('Project settings saved successfully');
            } else {
                console.error('Error saving project settings:', response);
                toast.error('Failed to save project settings');
            }
        } catch (error) {
            console.error('Error saving project settings:', error);
            toast.error('Failed to save project settings');
        }
    };

    const handleDeleteProject = async () => {
        try{
            const response = await api.delete(`/api/v1/Projects/${project.projectId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data:{
                    projectId: project.projectId,
                    owner: currentUser.username
                },
            });

            if (response.status === 200) {
                console.log('Project deleted successfully');
                toast.success('Project deleted successfully!');
                handleClose();
                window.location.replace('/dashboard/home'); //so projects are reloaded lol no way id do anything smarter at this point
            } else {
                console.error('Error deleting project:', response);
                toast.error(response);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Error deleting project:' + error);
        }
    }

  return (
    <div className='mr-8 md:mt-0 mt-3'>
      <Button className="w-full bg-surface-dark hover:bg-surface-mid-dark flex flex-row items-center" onClick={handleOpen} size="sm">
        <p className='text-center text-xs'>Settings</p>
        <SettingsIcon fontSize='extraSmall' className='text-center text-surface-light shadow-lg ml-1'></SettingsIcon>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30rem] w-[90vw] bg-[#2f2b3a] shadow-lg p-4 rounded">
          <div className='flex justify-between items-center'>
            <Typography variant='h4' className='text-white p-2'>
              Project Settings
            </Typography>
            <TrashIcon 
              className="text-surface-light duration-150 cursor-pointer w-6 h-6 ml-auto hover:text-red-400"
              title="Delete Project"
              onClick={(e) => {
                e.preventDefault(); 
                setDeletingProject({id:project.projectId, name: project.projectName}); 
                setIsDeleteProjectModalOpen(true);
              }} 
            />
            {/* <DeleteIcon className="text-secondary hover:text-red-900" fontSize='medium' onClick={handleDeleteProject}/> */}
          </div>
          <div className='flex flex-col justify-between h-full'>
            <div className='m-2'>
              <ErgoLabel labelName="Project name" />
              <ErgoInput
                  placeholder="Project name"
                  onChange={(value) => handleInputChange('projectName', value)}
                  value={projectName}
              />
            </div>
            <div className='m-2'>
              <ErgoLabel labelName="Description" />
              <ErgoTextarea
                  placeholder="Description"
                  onChange={(value) => handleInputChange('description', value)}
                  value={projDescription}
              />
            </div>
            <div className='m-2'>
              <ErgoLabel labelName="Github Owner" />
              <ErgoInput
                  placeholder="Github Owner"
                  onChange={(value) => handleInputChange('githubOwner', value)}
                  value={githubOwner}
              />
            </div>
            <div className='m-2'>
              <ErgoLabel labelName="Github Token" />
              <ErgoInput
                  placeholder="Github Token"
                  onChange={(value) => handleInputChange('githubToken', value)}
                  value={githubToken}
              />
            </div>
            <div className='m-2'>
              <ErgoLabel labelName="Github Repository" />
              <ErgoInput
                  placeholder="Github Repository"
                  onChange={(value) => handleInputChange('gitRepository', value)}
                  value={gitRepository}
              />
            </div>
            <div className='m-2'>
              <ErgoLabel labelName="Deadline" />
              <ErgoDatePicker
                label='Deadline'
                selectedDate={projDeadline}
                onChange={(value) => handleInputChange('deadline', value)}
              />
            </div>
            <div className='m-2 self-end'>
              <Button size="sm" className="bg-secondary hover:bg-primary" onClick={handleSaveSettings}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <DeleteProjectModal
        open={isDeleteProjectModalOpen}
        onClose={() => setIsDeleteProjectModalOpen(false)}
        onConfirm={(projectId) => handleDeleteProject(projectId)}
        projectData={{id: deletingProject?.id, name: deletingProject?.name}}
      />
    </div>
  );
};

export default ProjectSettings;
