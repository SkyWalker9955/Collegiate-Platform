using System.ComponentModel.DataAnnotations;

namespace SP21.P05.Web.Features.Venues
{
    public class VenueDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Range(1, int.MaxValue)]
        public int Capacity { get; set; }
        public int UniversityId { get; set; }
    }
}