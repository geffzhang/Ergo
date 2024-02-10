﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ErgoContext))]
    [Migration("20240210162727_VotedBadges")]
    partial class VotedBadges
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Ergo.Domain.Entities.Badge", b =>
                {
                    b.Property<Guid>("BadgeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("BadgeId");

                    b.ToTable("Badges");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.Comment", b =>
                {
                    b.Property<Guid>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CommentText")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TaskItemId")
                        .HasColumnType("uuid");

                    b.HasKey("CommentId");

                    b.HasIndex("TaskItemId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.InboxItem", b =>
                {
                    b.Property<Guid>("InboxItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("InboxItemId");

                    b.ToTable("InboxItems");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.PasswordResetCode", b =>
                {
                    b.Property<Guid>("PasswordResetCodeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ExpirationTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("PasswordResetCodeId");

                    b.ToTable("PasswordResetCodes");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.Photo", b =>
                {
                    b.Property<Guid>("PhotoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CloudURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TaskItemId")
                        .HasColumnType("uuid");

                    b.HasKey("PhotoId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.Project", b =>
                {
                    b.Property<Guid>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("GitRepository")
                        .HasColumnType("text");

                    b.Property<string>("GithubOwner")
                        .HasColumnType("text");

                    b.Property<string>("GithubToken")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("State")
                        .HasColumnType("integer");

                    b.HasKey("ProjectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.TaskItem", b =>
                {
                    b.Property<Guid>("TaskItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AssignedUserUserId")
                        .HasColumnType("uuid");

                    b.Property<string>("Branch")
                        .HasColumnType("text");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("ProjectId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("State")
                        .HasColumnType("integer");

                    b.Property<string>("TaskName")
                        .HasColumnType("text");

                    b.Property<TimeSpan>("TotalTimeSpent")
                        .HasColumnType("interval");

                    b.HasKey("TaskItemId");

                    b.HasIndex("AssignedUserUserId");

                    b.ToTable("TaskItems");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.UserPhoto", b =>
                {
                    b.Property<Guid>("UserPhotoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("PhotoUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserPhotoId");

                    b.ToTable("UserPhotos");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.UserVotedBadges", b =>
                {
                    b.Property<Guid>("UserVotedBadgesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("VotedId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("VoterId")
                        .HasColumnType("uuid");

                    b.HasKey("UserVotedBadgesId");

                    b.ToTable("UserVotedBadges");
                });

            modelBuilder.Entity("ProjectUser", b =>
                {
                    b.Property<Guid>("MembersUserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("ProjectsProjectId")
                        .HasColumnType("uuid");

                    b.HasKey("MembersUserId", "ProjectsProjectId");

                    b.HasIndex("ProjectsProjectId");

                    b.ToTable("ProjectUser");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.Comment", b =>
                {
                    b.HasOne("Ergo.Domain.Entities.TaskItem", null)
                        .WithMany("Comments")
                        .HasForeignKey("TaskItemId");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.TaskItem", b =>
                {
                    b.HasOne("Ergo.Domain.Entities.User", "AssignedUser")
                        .WithMany("Tasks")
                        .HasForeignKey("AssignedUserUserId");

                    b.Navigation("AssignedUser");
                });

            modelBuilder.Entity("ProjectUser", b =>
                {
                    b.HasOne("Ergo.Domain.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("MembersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Ergo.Domain.Entities.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Ergo.Domain.Entities.TaskItem", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Ergo.Domain.Entities.User", b =>
                {
                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
