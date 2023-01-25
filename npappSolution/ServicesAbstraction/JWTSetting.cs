namespace ServicesAbstraction;

public class JWTSetting
{
    private readonly string key;
        
    public JWTSetting() {
        key = "iloveyou!iloveyou!";
    }
    
    public string Key {
        get { return key; }
    }
}
