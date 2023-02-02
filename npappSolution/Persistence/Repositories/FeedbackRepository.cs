using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;
using Contracts;

namespace Persistence.Repositories;

public class FeedbackRepository: GenericRepository<Feedback>, IFeedbackRepository
{

    RepositoryDbContext cont;
    public FeedbackRepository(RepositoryDbContext _context): base(_context) {
        cont = _context;
    }

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.feedbackId == id).FirstOrDefaultAsync();
            if (exist == null) {
                return false;
            }

            cont.Feedbacks.Remove(exist);
            
        }catch(Exception ex) {
            return false;
        }

        return true;
    }

    public async Task<DtoPaginated<Feedback>> GetPaginated(long toiletId, int page, int itemCount, string? searchTerm){

        var feedBacks = dbSet.Include(x => x.Toilet).Where(x => x.toiletId == toiletId);
        if(toiletId == -1){
            feedBacks = dbSet.Include(x => x.Toilet);
        }

        if(searchTerm != null){
            feedBacks = feedBacks.Where(x => x.Toilet.name.ToLower().Contains(searchTerm.ToLower()));
        }

        var pageCount = Math.Ceiling((double)(feedBacks.Count() / itemCount));
        var paginatedDtos = await feedBacks.OrderBy(x => x.Toilet.name).Skip(page * (int)itemCount).Take((int)itemCount).ToListAsync();

        DtoPaginated<Feedback> paginated = new DtoPaginated<Feedback>(){ Data = paginatedDtos, ActualCount = feedBacks.Count() };

        return paginated;
    }
}
