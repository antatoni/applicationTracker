using ApplicationTracker.Api.Data;
using ApplicationTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApplicationTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController(Data.AppContext context) : ControllerBase
{
    private readonly Data.AppContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Application>>> GetApplications([FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(userId))
            return BadRequest("UserId is required");

        var applications = await _context.Applications
            .Where(a => a.UserUid == userId)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Application>> GetApplication(int id, [FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(userId))
            return BadRequest("UserId is required");

        var application = await _context.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserUid == userId);

        if (application == null)
            return NotFound();

        return Ok(application);
    }

    [HttpPost]
    public async Task<ActionResult<Application>> CreateApplication([FromBody] CreateApplicationRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var application = new Application
        {
            Company = request.Company,
            Url = request.Url ?? "Not Given",
            AppliedOn = request.AppliedOn,
            Stage = request.Stage,
            UserUid = request.UserUid,
            CreatedAt = DateTime.UtcNow
        };

        _context.Applications.Add(application);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetApplication), new { id = application.Id, userId = application.UserUid }, application);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApplication(int id, [FromBody] UpdateApplicationRequest request)
    {
        if (string.IsNullOrEmpty(request.UserId))
            return BadRequest("UserId is required");

        var application = await _context.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserUid == request.UserId);

        if (application == null)
            return NotFound();

        if (!string.IsNullOrEmpty(request.Company))
            application.Company = request.Company;

        if (!string.IsNullOrEmpty(request.Stage))
            application.Stage = request.Stage;

        if (request.Url != null)
            application.Url = request.Url;

        _context.Applications.Update(application);
        await _context.SaveChangesAsync();

        return Ok(application);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApplication(int id, [FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(userId))
            return BadRequest("UserId is required");

        var application = await _context.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserUid == userId);

        if (application == null)
            return NotFound();

        _context.Applications.Remove(application);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class CreateApplicationRequest
{
    public required string Company { get; set; }
    public string? Url { get; set; }
    public required DateOnly AppliedOn { get; set; }
    public required string Stage { get; set; }
    public required string UserUid { get; set; }
}

public class UpdateApplicationRequest
{
    public string? Company { get; set; }
    public string? Url { get; set; }
    public string? Stage { get; set; }
    public required string UserId { get; set; }
}
