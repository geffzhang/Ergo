import { RectangleStackIcon, CogIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import TasksStatsCard from "./TasksStatsCard";
import { TasksFromAllProjects, TaskStats } from "./types";
import { useUser } from "../../../../context/LoginRequired";

export function TasksStats() {
  const user = useUser();
  const [tasksFromAllProjects, setTasksFromAllProjects] = useState({} as TasksFromAllProjects);
  const [tasksStats, setTasksStats] = useState([] as TaskStats[]);
  const [projectsIds, setProjectsIds] = useState([] as string[]);

  useEffect(() => {
    (async () => {
      //get tasks from all projects
      try {
        const response = await api.get(`/api/v1/TaskItems/ByProjectsOfUser/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        setTasksFromAllProjects(response.data.taskItems);
      } catch (error : any) { 
        console.log(`Error while getting notifications: ${error.response.data}`);
      }
    })();
  }, []);

  useEffect(() => {
    if(Object.keys(tasksFromAllProjects).length <= 0) return;
    const projects = Object.keys(tasksFromAllProjects);
    const stats = [{ count: 0, footerValue: `${projects.length}` }, { count: 0, footerValue: "0" }, { count: 0, footerValue: "0" }];
    let nextDue = new Date();
    nextDue.setFullYear(2100);
    projects.forEach((project) => {
      tasksFromAllProjects[project].forEach((task) => {
        stats[task.state - 1].count++;
        if(task.state === 2 && new Date(task.deadline) < nextDue) nextDue = new Date(task.deadline); 
      });
    });

    //get the number of completed projects
    stats[2].footerValue = projects.filter((project) => {
      return tasksFromAllProjects[project].every((task) => task.state === 3);
    }).length.toString();

    if(stats[1].count === 0) {
      stats[1].footerValue = "No tasks in progress";
    } else {
      stats[1].footerValue = `${new Date(nextDue).getDate()}th of ${new Date(nextDue).toLocaleString("en-US", { month: "long" })} ${new Date(nextDue).getFullYear()}`;
    }

    setTasksStats(stats);
    setProjectsIds(projects);
  }, [tasksFromAllProjects]);

  return(
    <>
    {tasksStats.length !== 0 && (
      <>
      <TasksStatsCard
        color="bg-[#5e4d8c]"
        count={tasksStats[0].count}
        title="Tasks To Do"
        icon={React.createElement(RectangleStackIcon, {
          className: "w-8 h-8 text-white",
        })}
        footer={
          <Typography className="font-normal text-white">
            Across {projectsIds.length > 1 ? "all your" : ""} <strong>{tasksStats[0].footerValue}</strong> project{projectsIds.length != 1 ? "s" : ""}
          </Typography>
        }
      />
      <TasksStatsCard
        color="bg-[#3f6da6]"
        count={tasksStats[1].count}
        title="Tasks In Progress"
        icon={React.createElement(CogIcon, {
          className: "w-8 h-8 text-white",
        })}
        footer={
          <Typography className="font-normal text-white">
            Next due:&nbsp;
            <strong>{tasksStats[1].footerValue}</strong>
          </Typography>
        }
      />
      <TasksStatsCard
        color="bg-[#42a696]"
        count={tasksStats[2].count}
        title="Tasks Completed"
        icon={React.createElement(CheckBadgeIcon, {
          className: "w-8 h-8 text-white",
        })}
        footer={
          <Typography className="font-normal text-white">
            <strong>{tasksStats[2].footerValue}</strong> completed projects
          </Typography>
        }
      />
      </>
      )
    }
    </>
  )
}

export default TasksStats;