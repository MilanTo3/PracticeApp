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
}
