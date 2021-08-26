using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SP21.P05.Web.Features.Events
{
    public class EventUniversityDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public DateTimeOffset Occurs { get; set; }

        public int VenueCapacity { get; set; }
    }
}
