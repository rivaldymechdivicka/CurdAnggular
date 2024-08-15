using CurdAnggular.Server.Models;
using CurdAnggular.Server.Services;
using CurdAnggular.Server.Models;
using CurdAnggular.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CurdAnggular.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionsService _positionService;

        public PositionsController(IPositionsService positionService)
        {
            _positionService = positionService;
        }

        // GET: api/Positions
        [HttpGet]
        public async Task<IEnumerable<Position>> Get()
        {
            return await _positionService.GetPositionsList();
        }
    }
}
