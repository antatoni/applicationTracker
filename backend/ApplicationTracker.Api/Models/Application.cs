namespace ApplicationTracker.Api.Models;

public class Application
{
    public int Id { get; set; }

    public required string Company { get; set; }

    public string Url { get; set; } = "Not Given";

    public DateTime AppliedOn { get; set; }

    public required string Stage { get; set; }

    public required string userId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
