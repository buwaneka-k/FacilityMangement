namespace WebAPI.Models
{
    public class Facility
    {
        public int FacilityID { get; set; }
        public string? FacilityName { get; set; }
        public string? Location { get; set; }
        public int TypeID { get; set; }
        public string? Status { get; set; }

        // Navigation Properties
        public Types? Type { get; set; }
        public ICollection<Space> Spaces { get; set; } = new List<Space>();
    }
}
