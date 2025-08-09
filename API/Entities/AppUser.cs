namespace API.Entities;

public class AppUser
{
  public String ID { get; set; } = Guid.NewGuid().ToString();

  public required String DisplayName { get; set; }

  public required String Email { get; set; }
}
