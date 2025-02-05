﻿using FluentValidation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ergo.Application.Features.TaskItems.Commands.CreateTaskItem
{
    public class CreateTaskItemCommandValidator : AbstractValidator<CreateTaskItemCommand>
    {

        public CreateTaskItemCommandValidator()
        {
            RuleFor(p => p.TaskName)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");

            RuleFor(p => p.Description)
                .NotEmpty()
                .NotNull()
                .MaximumLength(1500).WithMessage("{PropertyName} must not exceed 1500 characters.");
            RuleFor(p => p.CreatedBy)
                .NotEmpty()
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");

            RuleFor(p => p.ProjectId)
                .NotEmpty()
                .NotNull();
            RuleFor(p => p.State)
                    .IsInEnum()
                    .WithMessage("{PropertyName} must be a valid value between 1-3");

        }
    }
}
