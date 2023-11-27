using Ergo.Application.Features.Comments.Commands.CreateComment;
using Ergo.Application.Features.Comments.Commands.DeleteComment;
using Ergo.Application.Features.Comments.Commands.UpdateComment;
using Ergo.Application.Features.Comments.Queries.GetAll;
using Ergo.Application.Features.Comments.Queries.GetById;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Ergo.Api.Controllers
{
    public class CommentsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateCommentCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Guid id, UpdateCommentCommand command)
        {
            if (id != command.CommentId)
            {
                return BadRequest("The ids must be the same!");
            }
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllCommentsQuery());
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteCommentCommand { CommentId = id };
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCommentById(Guid id)
        {
            var query = new GetByIdCommentQuery(id);
            var result = await Mediator.Send(query);
            return Ok(result);
        }
    }
}
