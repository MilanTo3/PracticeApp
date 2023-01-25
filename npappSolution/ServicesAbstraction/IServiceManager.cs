namespace ServicesAbstraction;

public interface IServiceManager
{
    IUserService UserService {get;}
    IFeedbackService FeedbackService{get;}
    IToiletService ToiletService{get;}
}
