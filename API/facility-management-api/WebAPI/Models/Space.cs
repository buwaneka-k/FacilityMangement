using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Space
    {
        public int SpaceID { get; set; }
        public int FacilityID { get; set; }
        public string? SpaceName { get; set; }
        public int TypeID { get; set; }
        public int? Capacity { get; set; }
        public string? Status { get; set; }

        public Types? Type { get; set; }
        public ICollection<Asset> Assets { get; set; } = new List<Asset>();

        // Navigation Properties
        [JsonIgnore]
        public Facility? Facility { get; set; }

    }
}
