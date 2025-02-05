﻿using FluentValidation;

namespace Ergo.Application.Features.Badges.Commands.CreateBadgeCommand
{
    public class CreateBadgeCommandValidator : AbstractValidator<CreateBadgeCommand>
    {
        public CreateBadgeCommandValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");
            RuleFor(p => p.Count)
                .NotNull()
                .GreaterThanOrEqualTo(0).WithMessage("{PropertyName} must be greater than or equal to 0.");
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(p => p.Type)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(x => x == "TasksDone" || x == "CommentsMade" || x == "ProjectsMade" || x == "HoursWorked" || x == "Innovator" || x == "Quality-Master" || x == "Problem-Solver" || x == "Team-Player");

        }
    }
}
