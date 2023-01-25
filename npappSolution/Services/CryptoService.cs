using System.Security.Cryptography;
using System.Text;
using System.Security.Principal;
using System.Security.Claims;
using System.Text;
using System.Security.Claims;

namespace Services;

public class CryptoService
{
    private const string pepper = "i love you";

    public static string createatoken() {

        return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
    }

    public static string hashPassword(string password){

        SHA256 hash = SHA256.Create();
        var hashedPasswordBytes = hash.ComputeHash(Encoding.Default.GetBytes(password + pepper));
        var hashedPasswordString = Convert.ToHexString(hashedPasswordBytes);
        return hashedPasswordString;
    }
}
