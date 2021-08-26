using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SP21.P05.Web.Data;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Universities;
using SP21.P05.Web.Features.Venues;

namespace SP21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/venues")]
    public class VenuesController : ControllerBase
    {
        private readonly DataContext dataContext;

        public VenuesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<Venue, VenueDto>> MapToDto()
        {
            return x => new VenueDto
            {
                Name = x.Name,
                Capacity = x.Capacity,
                Id = x.Id,
                UniversityId = x.UniversityId
            };
        }

        [HttpGet]
        public IEnumerable<VenueDto> GetAll()
        {
            return dataContext.Set<Venue>().Select(MapToDto());
        }

        [HttpGet("{id}")]
        public ActionResult<VenueDto> GetVenueById(int id)
        {
            var result = dataContext.Set<Venue>()
                .Where(x => x.Id == id)
                .Select(MapToDto())
                .FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<VenueDto> CreateVenue(VenueDto dto)
        {
            var adding = dataContext.Set<Venue>().Add(new Venue
            {
                Name = dto.Name,
                Capacity = dto.Capacity,
                UniversityId = dto.UniversityId
            });
            dataContext.SaveChanges();
            dto.Id = adding.Entity.Id;

            return Created($"/api/venues/{adding.Entity.Id}", dto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<VenueDto> UpdateVenue(VenueDto dto)
        {
            var target = dataContext.Set<Venue>().SingleOrDefault(x => x.Id == dto.Id);
            if (target == null)
            {
                return NotFound();
            }

            target.Name = dto.Name;
            target.Capacity = dto.Capacity;
            target.UniversityId = dto.UniversityId;

            dataContext.SaveChanges();

            return Ok(dto);
        }
    }
}