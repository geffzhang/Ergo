﻿using Ergo.App.Services.Responses;
using Ergo.App.ViewModels;
namespace Ergo.App.Contracts
{
    public interface ICommentDataService
    {
        Task<List<CommentViewModel>> GetCommentsAsync();
        Task<List<CommentViewModel>> GetCommentsByTaskIdAsync(Guid taskId);
        Task<ApiResponse<CommentDto>> CreateCommentAsync(CommentViewModel commentViewModel);
        Task<ApiResponse<UpdateCommentDto>> UpdateCommentAsync(UpdateCommentDto updateCommentDto);
        Task<ApiResponse<CommentDto>> DeleteCommentAsync(Guid commentId);
    }
}
