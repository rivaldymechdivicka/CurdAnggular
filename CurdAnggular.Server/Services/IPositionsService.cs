using CurdAnggular.Server.Models;

namespace CurdAnggular.Server.Services
{
    public interface IPositionsService
    {
        Task<IEnumerable<Models.Position>> GetPositionsList();
    }
}