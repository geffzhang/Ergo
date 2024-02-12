import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Menu, MenuHandler, IconButton, MenuList, MenuItem, CardBody } from "@material-tailwind/react";
import { ProjectsStatsItem } from "./ProjectsStatsItem";
import { ProjectsStatsType } from "./types";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { useUser } from "../../../../context/LoginRequired";

export function ProjectsStats({ projectsTasksCount, projectsCompletion } : any){
  const user = useUser();
  const [projectsStats, setProjectsStats] = useState({} as ProjectsStatsType);
  const [hiddenProjects, setHiddenProjects] = useState({} as ProjectsStatsType);
  const [isProjectsHidden, setIsProjectsHidden] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState({} as {[userId: string]: {name:string, img:string}});

  const getMemberData = async (userId : string) => {
    if(loadedUsers[userId]) return { name: loadedUsers[userId], img: loadedUsers[userId] };
    let userData = { name: "", userPhoto: {photoUrl: ""}, userId: ""}
    try{
      const response = await api.get(`/api/v1/Users/ById/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      userData = response.data.user;
      setLoadedUsers((prev : any) => {
        return {
          ...prev,
          [userId]: { name: userData.name, img: userData.userPhoto?.photoUrl, userId }
        }
      });
    }
    catch (error : any) {
      console.log(`Error while getting user data: ${error}`);
    } finally {
      return { name: userData.name, img: userData.userPhoto?.photoUrl, userId };
    }
  }

  useEffect(() => {
    if(Object.keys(projectsTasksCount).length <= 0) return;
    (async () => {
      try{
        const response = await api.get(`/api/v1/Projects/GetProjectsByUserId/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        const projects = response.data.projects;
        for(const project of projects){
          const projectMembers = await Promise.all(project.members.map((member : any) => getMemberData(member.userId)));
          setProjectsStats((prev : ProjectsStatsType) => {
            return {
              ...prev,
              [project.projectId]: {
                name: project.projectName,
                members: [...projectMembers],
                deadline: project.deadline,
                totalTasksCount: projectsTasksCount[project.projectId],
                completion: projectsCompletion[project.projectId],
                path: `/dashboard/project/${project.projectId}`,
              }
            }
          });
        };
      }
      catch (error : any) {
        console.log(`Error while getting projects: ${error}`);
      }
    })();
  }, [projectsTasksCount, projectsCompletion]);

  const toggleHideCompletedProjects = (e : any) => {
    e.preventDefault();
    if(isProjectsHidden){
      setProjectsStats((prev : ProjectsStatsType) => {
        return {
          ...prev,
          ...hiddenProjects
        }
      });
    } else {
      setHiddenProjects(projectsStats);
      setProjectsStats(Object.fromEntries(Object.entries(projectsStats).filter(([projectId, project]) => project.completion < 100)));
    }
    setIsProjectsHidden(!isProjectsHidden);
  }

  return(
    <Card className="overflow-hidden mt-12 xl:col-span-3 bg-surface-dark shadow-sm">
      <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
        <Typography variant="h5" className="mb-1 text-surface-light">
          Your Projects
        </Typography>
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton size="sm" variant="text" color="white">
              <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6"/>
            </IconButton>
          </MenuHandler>
          <MenuList className="bg-surface-mid border-surface-dark text-surface-light">
            <MenuItem onClick={toggleHideCompletedProjects}>
              {isProjectsHidden ? "Show Completed Projects" : "Hide Completed Projects"}
            </MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["project", "members", "deadline", "total tasks", "completion"].map((headerItem) => (
                <th key={headerItem} className="border-b border-primary py-3 px-6 text-left">
                  <Typography variant="small"className="text-[11px] font-medium uppercase text-surface-light">
                    {headerItem}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projectsStats && Object.keys(projectsStats).map((projectId, index) => {
              const className = `py-3 px-5 ${index === Object.keys(projectsStats).length - 1 ? "" : "border-b border-secondary border-opacity-10"}`;
              const project = projectsStats[projectId];
              return (
                <ProjectsStatsItem 
                  key={projectId} 
                  name={project.name} 
                  members={project.members} 
                  deadline={project.deadline}
                  totalTasksCount={project.totalTasksCount}
                  completion={project.completion} 
                  path={project.path} 
                  className={className} />
              );
            })
            }
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default ProjectsStats;
