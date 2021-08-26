using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SP21.P05.Web.Data;
using SP21.P05.Web.Extensions;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Venues;

namespace SP21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/events")]
    public class EventsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public EventsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<Event, EventDto>> MapToDto()
        {
            return x => new EventDto
            {
                Name = x.Name,
                VenueCapacity = x.Venue.Capacity,
                Occurs = x.Occurs,
                Id = x.Id,
                VenueId = x.VenueId
            };
        }

        [HttpGet]
        public IEnumerable<EventDto> GetAll()
        {
            return dataContext.Set<Event>().Select(MapToDto());
        }

        [HttpGet("{id}")]
        public ActionResult<EventDto> GetEventById(int id)
        {
            var result = dataContext.Set<Event>()
                .Where(x => x.Id == id)
                .Select(MapToDto())
                .FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("upcoming")]
        public IEnumerable<EventDto> GetUpcomingEvents()
        {
            var now = DateTimeOffset.UtcNow;
            var tomorrow = now.AddDays(1);

            return dataContext.Set<Event>().Where(x => x.Occurs > now && x.Occurs < tomorrow).Select(MapToDto());
        }

        [HttpPost]
        [Authorize]
        public ActionResult<EventDto> CreateEvent(EventDto dto)
        {
            if (dto.Occurs < DateTimeOffset.UtcNow)
            {
                return BadRequest();
            }

            var venue = dataContext.Set<Venue>().SingleOrDefault(x => x.Id == dto.VenueId);
            if (venue == null)
            {
                return BadRequest();
            }

            var adding = dataContext.Set<Event>().Add(new Event
            {
                Name = dto.Name,
                Occurs = dto.Occurs,
                VenueId = dto.VenueId,
                CreatedByUserId = User.GetCurrentUserId() ?? throw new Exception("should have user id")
            });
            dataContext.SaveChanges();
            dto.Id = adding.Entity.Id;
            dto.VenueCapacity = venue.Capacity;

            return Created($"/api/events/{adding.Entity.Id}", dto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<EventDto> UpdateEvent(EventDto dto)
        {
            var target = dataContext.Set<Event>().SingleOrDefault(x => x.Id == dto.Id);
            if (target == null)
            {
                return NotFound();
            }

            var venue = dataContext.Set<Venue>().SingleOrDefault(x => x.Id == dto.VenueId);
            if (venue == null)
            {
                return BadRequest();
            }

            var currentUserId = User.GetCurrentUserId();
            if (!User.IsInRole(RoleNames.Admin) && target.CreatedByUserId != currentUserId)
            {
                return Forbid();
            }

            target.Name = dto.Name;
            target.Occurs = dto.Occurs;
            target.VenueId = dto.VenueId;
            dto.VenueCapacity = venue.Capacity;

            dataContext.SaveChanges();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<EventDto> DeleteEvent(int id)
        {
            var target = dataContext.Set<Event>().SingleOrDefault(x => x.Id == id);
            if (target == null)
            {
                return NotFound();
            }

            var currentUserId = User.GetCurrentUserId();
            if (!User.IsInRole(RoleNames.Admin) && target.CreatedByUserId != currentUserId)
            {
                return Forbid();
            }

            dataContext.Set<Event>().Remove(target);

            dataContext.SaveChanges();

            return Ok();
        }
    }
}