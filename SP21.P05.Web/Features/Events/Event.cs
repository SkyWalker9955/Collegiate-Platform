using System;
using SP21.P05.Web.Features.Universities;
using SP21.P05.Web.Features.Users;
using SP21.P05.Web.Features.Venues;

namespace SP21.P05.Web.Features.Events
{
    public class Event
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset Occurs { get; set; }

        public int VenueId { get; set; }
        public virtual Venue Venue { get; set; }

        public int CreatedByUserId { get; set; }
        public virtual User CreatedByUser { get; set; }
    }
}