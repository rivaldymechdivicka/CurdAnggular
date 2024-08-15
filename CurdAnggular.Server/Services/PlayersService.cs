using CurdAnggular.Server.Data;
using CurdAnggular.Server.Models;
using CurdAnggular.Server.Data;
using CurdAnggular.Server.Models;
using CurdAnggular.Server.Services;
using Microsoft.EntityFrameworkCore; 

namespace CurdAnggular.Server.Services
{
    public class PlayersService : IPlayersService
    {
        private readonly FootballDbContext _context;

        public PlayersService(FootballDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetPlayersList()
        {
            return await _context.Players
                .Include(x => x.Position)
                .ToListAsync();
        }

        public async Task<Player> GetPlayerById(int id)
        {
            return await _context.Players
                .Include(x => x.Position)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Player> CreatePlayer(Player player)
        {
            var lastPlayer = _context.Players.OrderByDescending(p => p.Id).FirstOrDefault();
            int newID = (lastPlayer != null) ? lastPlayer.Id + 1 : 1;

            var newPlayer = new Player
            {
                Id = newID,
                ShirtNo = player.ShirtNo,
                Name = player.Name,
                PositionId = player.PositionId,
                Appearances = player.Appearances,
                Goals = player.Goals,
                Position = player.Position,
            };

            _context.Players.Add(newPlayer);
            await _context.SaveChangesAsync();
            return newPlayer; // Kembalikan newPlayer, bukan player yang diterima
        }

        public async Task UpdatePlayer(Player player)
        {
            _context.Players.Update(player);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayer(Player player)
        {
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
        }
    }
}
