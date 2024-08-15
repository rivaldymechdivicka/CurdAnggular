using CurdAnggular.Server.Data;
using CurdAnggular.Server.Models;
using CurdAnggular.Server.Data;
using CurdAnggular.Server.Models;
using CurdAnggular.Server.Services;
using Microsoft.EntityFrameworkCore; // Pastikan Anda menggunakan namespace ini

namespace CurdAnggular.Server.Services
{
    public class PositionsService : IPositionsService
    {
        private readonly FootballDbContext _context;

        public PositionsService(FootballDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsList()
        {
            return await _context.Positions
                .OrderBy(x => x.DisplayOrder)
                .ToListAsync();
        }
    }
}
