namespace Persistence.Repositories;
using Domain.Repositories;

public class RepositoryManager :  IRepositoryManager
{

    private readonly Lazy<IUserRepository> _lazyUserRepository;
    private readonly Lazy<IUnitofWork> _lazyUnitOfWork;
    private readonly Lazy<IFeedbackRepository> _lazyFeedbackRepository;
    private readonly Lazy<IToiletRepository> _lazyToiletRepository;

    public RepositoryManager(RepositoryDbContext dbContext){

        _lazyUserRepository = new Lazy<IUserRepository>(() => new UserRepository(dbContext));
        _lazyUnitOfWork = new Lazy<IUnitofWork>(() => new UnitOfWork(dbContext));
        _lazyToiletRepository = new Lazy<IToiletRepository>(() => new ToiletRepository(dbContext));
        _lazyFeedbackRepository = new Lazy<IFeedbackRepository>(() => new FeedbackRepository(dbContext));

    }

    public IUserRepository userRepository => _lazyUserRepository.Value;
    public IUnitofWork UnitOfWork => _lazyUnitOfWork.Value;
    public IToiletRepository toiletRepository => _lazyToiletRepository.Value;
    public IFeedbackRepository feedbackRepository => _lazyFeedbackRepository.Value;

}
