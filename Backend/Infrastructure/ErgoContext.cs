
using Ergo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ErgoContext : DbContext
{
    public ErgoContext(DbContextOptions<ErgoContext> options) : base(options) { }
    public DbSet<Project> Projects { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<InboxItem> InboxItems { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<PasswordResetCode> PasswordResetCodes { get; set; }
    public DbSet<UserPhoto> UserPhotos { get; set; }
    public DbSet<Badge> Badges { get; set; }
    public DbSet<UserVotedBadges> UserVotedBadges { get; set; }
}