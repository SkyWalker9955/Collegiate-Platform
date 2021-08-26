using System.Collections.Generic;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Universities;

namespace SP21.P05.Web.Features.Venues
{
    public class Venue
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Capacity { get; set; }

        public virtual ICollection<Event> Events { get; set; } = new List<Event>();

        //University added (one) 
        public int UniversityId { get; set; }
        public virtual University University { get; set; }
    }
}