﻿using Ergo.Domain.Common;
using Ergo.Domain.Entities.Enums;
using System.Xml.Linq;

namespace Ergo.Domain.Entities
{
    public class Project : AuditableEntity
    {
        
        private Project(string projectName, string description,string? githubOwner,string? githubToken, string? gitRepository, DateTime deadline, string fullName)
        {
            ProjectId = Guid.NewGuid();
            ProjectName = projectName;
            Description = description;
            GithubOwner = githubOwner;
            GithubToken = githubToken;
            GitRepository = gitRepository;
            CreatedBy = fullName;
            CreatedDate = DateTime.UtcNow;
            LastModifiedBy = fullName;
            LastModifiedDate = DateTime.UtcNow;
            StartDate = DateTime.UtcNow;
            Deadline = deadline;
            State = ProjectState.JustStarted;
            Members = new List<User>();
        }
        private Project()
        {
            
        }
        public List<User>? Members { get;  set; }
        public Guid ProjectId { get; private set; }
        public string ProjectName { get; private set; }
        public string Description { get; private set; }
        public string? GithubOwner { get; private set; }
        public string? GithubToken { get; private set; }
        public string? GitRepository { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime Deadline { get; private set; }
        public ProjectState State { get; private set; }

        public static Result<Project> Create(string projectName, string description, string? githubOwner, string? githubToken, string? gitRepository, DateTime deadline, string fullName)
        {
            if (string.IsNullOrWhiteSpace(projectName))
            {
                return Result<Project>.Failure(Constants.ProjectNameRequired);
            }

            if (string.IsNullOrWhiteSpace(description))
            {
                return Result<Project>.Failure(Constants.DescriptionRequired);
            }

            if (deadline == default)
            {
                return Result<Project>.Failure(Constants.DeadlineRequired);
            }
            if(string.IsNullOrWhiteSpace(fullName))
            {
                return Result<Project>.Failure(Constants.CreatorFullNameRequired);
            }
            

            return Result<Project>.Success(new Project(projectName, description,githubOwner,githubToken, gitRepository, deadline, fullName));
        }

        public Result<Project> UpdateData(string projectName, string description, string? githubOwner, string? githubToken, string? gitRepository, DateTime deadline, ProjectState state, string fullName)
        {
            if (string.IsNullOrWhiteSpace(projectName))
            {
                return Result<Project>.Failure(Constants.ProjectNameRequired);
            }
            if (string.IsNullOrWhiteSpace(description))
            {
                return Result<Project>.Failure(Constants.DescriptionRequired);
            }
            if (deadline == default)
            {
                return Result<Project>.Failure(Constants.DeadlineRequired);
            }
            if (string.IsNullOrWhiteSpace(fullName))
            {
                return Result<Project>.Failure(Constants.CreatorFullNameRequired);
            }
            if (!Enum.IsDefined(typeof(ProjectState), state))
            {
                return Result<Project>.Failure("A valid project state is required");
            }

            ProjectName = projectName;
            Description = description;
            GithubOwner = githubOwner;
            GithubToken = githubToken;
            GitRepository = gitRepository;
            LastModifiedBy = fullName;
            LastModifiedDate = DateTime.UtcNow;
            State = state;
            Deadline = deadline;
            return Result<Project>.Success(this);
        }


        public Result<Project> AssignUser(User member)
        {
            if(Members == null)
            {
                Members = new List<User>();
            }
            if(member == null)
            {
                return Result<Project>.Failure("User is required");
            }

            Members.Add(member);
            return Result<Project>.Success(this);
        }
    }
}
