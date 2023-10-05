﻿using Microsoft.EntityFrameworkCore;
using QuizProject.Data;
using QuizProject.Model;
using QuizProject.Repository.IRepository;

namespace QuizProject.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        public AuthRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User> GetUserByUsername(string email)
        {

            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        }
    }
}
