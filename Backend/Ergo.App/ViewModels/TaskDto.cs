﻿using Ergo.Domain.Entities.Enums;

namespace Ergo.App.ViewModels
{
    public class TaskDto
    {
        public Guid TaskItemId { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime Deadline { get; set; }
        public string? CreatedBy { get; set; }
        public Guid ProjectId { get; set; }
        public TaskState? State { get; set; }
        public UserTaskDto? AssignedUser { get; set; }
    }
}
