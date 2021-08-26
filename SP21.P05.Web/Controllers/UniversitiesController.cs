using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SP21.P05.Web.Data;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Universities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace SP21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/universities")]


    public class UniversitiesController : ControllerBase
    {
        private readonly DataContext dataContext;

        public UniversitiesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<University, UniversityDto>> MapToDto()
        {
            return x => new UniversityDto
            {
                Name = x.Name,
                Address = x.Address,
                Id = x.Id

            };
        }

        private static Expression<Func<Event, EventUniversityDto>> MapToEventDto()
        {
            return x => new EventUniversityDto
            {
                Name = x.Name,
                Occurs = x.Occurs,
                Id = x.Id,
                VenueCapacity = x.Venue.Capacity

            };
        }


        [HttpGet]
        public IEnumerable<UniversityDto> GetUniversity()
        {
            return dataContext.Set<University>().Select(MapToDto());
        }


        [HttpGet("{id}")]
        public ActionResult<UniversityDto> GetUniversityById(int id)
        {
            var result = dataContext.Set<University>()
                .Where(x => x.Id == id)
                .Select(MapToDto())
                .FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpGet("{id}/events")]
        public ActionResult<EventDto> GetUniversityEvents(int id)
        {
            var result = dataContext.Set<Event>()
                .Where(x => x.Venue.UniversityId == id)
                .Select(MapToEventDto())
                .ToArray();
            if (result == null)
            {
                return NotFound("No events were found for a current university");
            }
            return Ok(result);
        }


        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<UniversityDto> CreateUniversity(UniversityDto dto)
        {
            var adding = dataContext.Set<University>().Add(new University
            {
                Name = dto.Name,
                Address = dto.Address
            });
            dataContext.SaveChanges();
            dto.Id = adding.Entity.Id;

            return Created($"/api/universities/{adding.Entity.Id}", dto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<UniversityDto> UpdateUniversity(UniversityDto dto)
        {
            var target = dataContext.Set<University>().SingleOrDefault(x => x.Id == dto.Id);
            if (target == null)
            {
                return NotFound();
            }

            target.Name = dto.Name;
            target.Address = dto.Address;

            dataContext.SaveChanges();

            return Ok(dto);
        }
    }
}
