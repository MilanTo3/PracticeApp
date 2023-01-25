using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;
using Contracts;

namespace Persistence.Repositories;

public class ToiletRepository: GenericRepository<Toilet>, IToiletRepository
{

    RepositoryDbContext cont;
    public ToiletRepository(RepositoryDbContext _context): base(_context) {
        cont = _context;
    }
}
