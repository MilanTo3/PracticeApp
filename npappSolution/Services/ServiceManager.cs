using ServicesAbstraction;
using Domain.Repositories;

namespace Services;

public class ServiceManager : IServiceManager
{
    private readonly Lazy<IUserService> _lazyUserService;

    public ServiceManager(IRepositoryManager repositoryManager){
        _lazyUserService = new Lazy<IUserService>(() => new UserService(repositoryManager));

    }

    public IUserService UserService => _lazyUserService.Value;
}
