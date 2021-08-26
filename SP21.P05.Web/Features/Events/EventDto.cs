using System;
using System.ComponentModel.DataAnnotations;

namespace SP21.P05.Web.Features.Events
{
    public class EventDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public DateTimeOffset Occurs { get; set; }

        public int VenueCapacity { get; set; }

        [Range(1, int.MaxValue)]
        public int VenueId { get; set; }
    }
}