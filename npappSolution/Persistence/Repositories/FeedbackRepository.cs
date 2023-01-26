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
}
