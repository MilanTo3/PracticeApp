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

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.toiletId == id).FirstOrDefaultAsync();
            if (exist == null) {
                return false;
            }

            dbSet.Remove(exist);
            
        }catch(Exception ex) {
            return false;
        }

        return true;
    }

    public async Task<bool> UpdateToilet(Toilet toilet){

        var g = await dbSet.Where(x => x.toiletId == toilet.toiletId).FirstOrDefaultAsync();
        if(g == null){
            return false;
        }
        g.gender = toilet.gender;
        g.name = toilet.name;
        g.location = toilet.location;

        try{
            dbSet.Update(g);
        }catch{
            return false;
        }

        return true;
    }
}
