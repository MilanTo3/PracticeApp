using System.Threading.Tasks;
using System.Threading;
using Domain.Repositories;

namespace Persistence.Repositories;

public class UnitOfWork: IUnitofWork, IDisposable
{

    private readonly RepositoryDbContext _dbContext;
    public UnitOfWork(RepositoryDbContext dbContext) => _dbContext = dbContext;

    public Task<int> Complete() => _dbContext.SaveChangesAsync();

    public void Dispose(){
        _dbContext.Dispose();
    }

}
