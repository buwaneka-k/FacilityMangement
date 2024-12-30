using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Types
    {
        public int TypeID { get; set; }
        public string? TypeName { get; set; }
        public string? TableName { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public ICollection<Facility> Facilities { get; set; } = new List<Facility>();
        [JsonIgnore]
        public ICollection<Space> Spaces { get; set; } = new List<Space>();

    }
}
