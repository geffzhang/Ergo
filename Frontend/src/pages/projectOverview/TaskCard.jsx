import React from 'react';
import { Card, CardContent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 

const formatDeadline = (deadline) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDeadline = new Date(deadline).toLocaleDateString(undefined, options);
  return formattedDeadline;
};

const TaskCard = ({ task, handleOpenModal, color }) => {
  const truncatedDescription = task.description.length > 100 ? `${task.description.slice(0, 150)}...` : task.description;

  return (
    <Card
      key={task.taskItemId}
      className={`mb-4 opacity-80 cursor-pointer hover:opacity-60`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => handleOpenModal(task)}
    >
      <CardContent className='transition duration-200 ease-in-out'>
        <p className='text-white mb-1 text-lg'>
          {task.taskName}
        </p>
        <p className='text-gray-200 my-1 text-xs' component="p">
          {truncatedDescription}
        </p>
        <div className='flex flex-row justify-between mt-4'>
          <div className='flex flex-row'>
              <p className='text-gray-200 text-xs font-medium' component="p">
                {formatDeadline(task.deadline)}
              </p>
              <AccessTimeIcon className="text-gray-100 ml-1" fontSize='extraSmall'/>
          </div>  
          <div className='bg-surface-light h-5 w-5 rounded-xl'>
            <span className="text-white opacity-0 transition-opacity duration-300 absolute">Your Text Here</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
