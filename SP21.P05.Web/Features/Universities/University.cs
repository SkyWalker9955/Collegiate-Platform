using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Venues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SP21.P05.Web.Features.Universities
{
    public class University
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Address { get; set; }

        //Navigation to events (many)
        public virtual ICollection<Event> Events { get; set; } = new List<Event>();

        //Navigation to venues (many)
        public virtual ICollection<Venue> Venues { get; set; } = new List<Venue>();
    }
}
