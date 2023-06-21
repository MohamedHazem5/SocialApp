using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users.Where(x=>x.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p=>p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p=>p.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0 ;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified; 
        }

        // public bool IsEmailTaken(string email, int? userId = null)
        // {
        // // If userId is provided, check if the email is taken by another user
        // if (userId.HasValue)
        // {
        //     return _context.Users.Any(user => user.Id != userId.Value && user.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        // }

        // // If userId is not provided, check if the email is taken by any user
        //     return _context.Users.Any(user => user.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        // }

        // bool IsUsernameTaken(string username, int? userId)
        // {
        //     if (userId.HasValue)
        //     {
        //         return _context.Users.Any(user => user.Id != userId.Value && user.UserName.Equals(username, StringComparison.OrdinalIgnoreCase));
        //     }

        //     // If userId is not provided, check if the username is taken by any user
        //     return _context.Users.Any(user => user.UserName.Equals(username, StringComparison.OrdinalIgnoreCase));
        // }
    }
}