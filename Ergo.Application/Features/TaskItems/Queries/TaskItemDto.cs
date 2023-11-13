﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ergo.Application.Features.TaskItems.Queries
{
    public class TaskItemDto
    {
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime Deadline { get; set; }
        public string? FullName { get; set; }
        public Guid ProjectId { get; set; }
    }
}
