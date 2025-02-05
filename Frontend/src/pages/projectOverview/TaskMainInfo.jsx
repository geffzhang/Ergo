import React, { useState, useEffect } from 'react';
import { Typography, Select, Option, Button } from '@material-tailwind/react';
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from "react-toastify";
import api from '@/services/api';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useUser } from '@/context/LoginRequired';
import EditStateModal from './EditStateModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ErgoTextarea from "@/widgets/form_utils/ErgoTextArea";
import ErgoInput from "@/widgets/form_utils/ErgoInput";


const TaskMainInfo = ({ selectedTask, setSelectedTask, token,onClose }) => {
  const [editMode, setEditMode] = useState({ taskName: false, description: false });
  const [updatedTaskName, setUpdatedTaskName] = useState(selectedTask.taskName);
  const [updatedDescription, setUpdatedDescription] = useState(selectedTask.description);
  const [currentTask, setCurrentTask] = useState([]);
  const [selectedState, setSelectedState] = useState(selectedTask.state);
  const [isEditStateModalOpen, setIsEditStateModalOpen] = useState(false); 
  const currentUser = useUser();

  const handleDoubleClick = (field) => {
    setEditMode(prevState => ({ ...prevState, [field]: true }));
  };

  const fetchCurrentTask = async () => {
    try {
      const response = await api.get(`/api/v1/TaskItems/${selectedTask.taskItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCurrentTask(response.data.taskItem);
        setSelectedState(response.data.taskItem.state);
      } else {
        console.error('Error fetching tasks:', response);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskStateUpdated = () => {
    fetchCurrentTask();
  };

  useEffect(() => {
    fetchCurrentTask();
  }, [editMode]);

  const handleUpdateTask = async () => {
    try {
      const response = await api.put(`/api/v1/TaskItems/${selectedTask.taskItemId}`, {
        taskItemId: selectedTask.taskItemId,
        taskName: updatedTaskName,
        description: updatedDescription,
        deadline: selectedTask.deadline,
        createdBy: selectedTask.createdBy,
        projectId: selectedTask.projectId,
        state: selectedTask.state,
        branch: selectedTask.branch,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Task updated successfully');
        fetchCurrentTask();
      } else {
        console.error('Error updating task:', response);
        toast.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleSave = () => {
    handleUpdateTask();
    setEditMode({ taskName: false, description: false });
  };

  const handleOpenEditStateModal = () => {
    setIsEditStateModalOpen(true);
  };

  const handleCloseEditStateModal = () => {
    setIsEditStateModalOpen(false);
  };
  const handleDeleteTask = async () => {
    console.log(selectedTask);
    try {
      const response = await api.delete(`/api/v1/TaskItems/${selectedTask.taskItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { 
          taskItemId: selectedTask.taskItemId,
          userId: currentUser.userId
        }
      });

      if (response.status === 200) {
        toast.success('Task deleted successfully');
        onClose();
      } else {
        console.error('Error deleting task:', response);
        toast.error('Failed to delete task');
      }
      
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  }
  return (
    <div>
      <div className="flex flex-col pr-2 mt-2">
      <div className='flex align-items gap-2'>
      {currentTask.state === 1 && (
          <Button size='sm' onClick={handleOpenEditStateModal} className="w-[5rem] text-xs text-center rounded-md text-surface-darkest bg-secondary p-1 ml-2">To Do</Button>
        )}
        {currentTask.state === 2 && (
          <Button size='sm' onClick={handleOpenEditStateModal}  className="w-[7rem] text-xs text-center rounded-md text-surface-darkest bg-blue-400 p-1 ml-2">In Progress</Button>
        )}
        {currentTask.state === 3 && (
          <Button size='sm'  onClick={handleOpenEditStateModal} className="w-[3rem] text-xs text-center rounded-md text-surface-darkest bg-teal-300 p-1 ml-2">Done</Button>
        )}
        <DeleteIcon className="text-secondary hover:text-red-900" fontSize='medium' onClick={handleDeleteTask}/>
      </div>
      

        {editMode.taskName && (selectedTask.assignedUser && selectedTask.assignedUser.username === currentUser.username) ? (
          <div className='flex md:flex-row flex-col justify-center items-center mt-4'>
            <ErgoInput
              value={updatedTaskName}
              onChange={(val) => setUpdatedTaskName(val)}
            />
            <SaveAsIcon
              onClick={handleSave}
              fontSize='medium'
              className='text-surface-light hover:text-secondary ml-1 cursor-pointer'
            />
          </div>

        ) : (
          <Typography variant='h4' className='text-white py-2 ml-2' onDoubleClick={() => handleDoubleClick('taskName')}>
            {updatedTaskName}
          </Typography>
        )}
      </div>
      <div className='flex flex-row mt-4 pr-2 items-center'>
        {editMode.description && selectedTask.assignedUser && selectedTask.assignedUser.username === currentUser.username ? (
          <div className="flex flex-grow items-center">
            <ErgoTextarea
              value={updatedDescription}
              onChange={(val) => setUpdatedDescription(val)}
              className="bg-transparent text-white text-lg focus:outline-none resize-none border-2 p-4 border-surface-mid flex-grow"
              style={{ height: '100px'}}
            />
            <button onClick={handleSave}>
              <SaveAsIcon fontSize='medium' className='text-surface-light ml-2 cursor-pointer hover:text-secondary' />
            </button>
          </div>
        ) : (
          <div>
            <div className='flex flex-row items-center'>
              <DescriptionIcon className='text-secondary ml-1' fontSize='extraSmall'></DescriptionIcon>
              <p
                className='text-gray-300 ml-1 text-md font-semibold'
              >
                Description
              </p>
            </div>
            <p variant="body2" className='text-surface-light pl-2 py-2 pr-12 text-lg' onDoubleClick={() => handleDoubleClick('description')}>
              {updatedDescription}
            </p>
          </div>
        )}
        {selectedTask.assignedUser && selectedTask.assignedUser.username === currentUser.username && (
        <EditStateModal
            open={isEditStateModalOpen}
            onClose={handleCloseEditStateModal}
            projectId={selectedTask.taskItemId}
            token={token}
            selectedTask={selectedTask}
            onTaskStateUpdated={handleTaskStateUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default TaskMainInfo;