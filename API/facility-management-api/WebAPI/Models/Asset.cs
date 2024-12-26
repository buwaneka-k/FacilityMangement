using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Asset
    {
        public int AssetID { get; set; }
        public int SpaceID { get; set; }
        public string? AssetName { get; set; }
        public string? Category { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public DateTime? WarrantyExpiry { get; set; }
        public string? Condition { get; set; }
        public string? Status { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Space? Space { get; set; }
    }
}
