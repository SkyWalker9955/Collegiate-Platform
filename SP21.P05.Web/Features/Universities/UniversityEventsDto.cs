using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Venues;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP21.P05.Web.Features.Universities
{
    public class UniversityEventsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        //public virtual IEnumerable<Venue> Venues { get; set; }
        //public virtual IEnumerable<Event> Events { get; set; }
    }
}
