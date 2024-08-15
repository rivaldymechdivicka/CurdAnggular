using CurdAnggular.Server.Models;


namespace CurdAnggular.Server.Services
{
    public interface IPlayersService
    {
        Task<IEnumerable<Models.Player>> GetPlayersList();
        Task<Models.Player> GetPlayerById(int id);
        Task<Models.Player> CreatePlayer(Models.Player player);
        Task UpdatePlayer(Models.Player player);
        Task DeletePlayer(Models.Player player);
    }
}