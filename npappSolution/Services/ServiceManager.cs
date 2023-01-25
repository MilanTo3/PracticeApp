using ServicesAbstraction;
using Domain.Repositories;

namespace Services;

public class ServiceManager : IServiceManager
{
    private readonly Lazy<IUserService> _lazyUserService;
    private readonly Lazy<IFeedbackService> _lazyFeedbackService;
    private readonly Lazy<IToiletService> _lazyToiletService;

    public ServiceManager(IRepositoryManager repositoryManager){
        _lazyUserService = new Lazy<IUserService>(() => new UserService(repositoryManager));
        _lazyToiletService = new Lazy<IToiletService>(() => new ToiletService(repositoryManager));
        _lazyFeedbackService = new Lazy<IFeedbackService>(() => new FeedbackService(repositoryManager));
    }

    public IUserService UserService => _lazyUserService.Value;
    public IToiletService ToiletService => _lazyToiletService.Value;
    public IFeedbackService FeedbackService => _lazyFeedbackService.Value;
}
