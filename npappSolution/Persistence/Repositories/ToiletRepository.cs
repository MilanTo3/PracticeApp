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
        g.city = toilet.city;
        g.name = toilet.name;
        g.location = toilet.location;

        try{
            dbSet.Update(g);
        }catch{
            return false;
        }

        return true;
    }

    public async Task<Toilet> getWithFeedbacks(long toiletId){

        var t = await dbSet.Where(x => x.toiletId == toiletId).Include(p => p.Feedbacks).FirstOrDefaultAsync();

        return t;
    }

    public async Task<IEnumerable<Toilet>> getAllWithFeedbacks(){

        var t = await dbSet.Include(p => p.Feedbacks).ToListAsync();

        return t;
    }

    public async Task<DtoPaginated<Toilet>> GetPaginated(int page, int itemCount, string? searchTerm){

        IQueryable<Toilet> feedBacks = dbSet;

        if(searchTerm != null){
            feedBacks = feedBacks.Where(x => x.name.ToLower().Contains(searchTerm.ToLower()));
            
        }

        var pageCount = Math.Ceiling((double)(feedBacks.Count() / itemCount));
        var paginatedDtos = await feedBacks.OrderBy(x => x.name).Skip(page * (int)itemCount).Take((int)itemCount).ToListAsync();

        DtoPaginated<Toilet> paginated = new DtoPaginated<Toilet>(){ Data = paginatedDtos, ActualCount = feedBacks.Count() };

        return paginated;
    }

    public async Task<DtoPaginated<Toilet>> GetPaginatedForSummary(long toiletId, int page, int itemCount, string? searchTerm){

        var feedBacks = dbSet.Include(x => x.Feedbacks).Where(x => x.toiletId == toiletId);
        if(toiletId == -1){
            feedBacks = dbSet.Include(x => x.Feedbacks);
        }

        if(searchTerm != null){
            feedBacks = feedBacks.Where(x => x.name.ToLower().Contains(searchTerm.ToLower()));
            
        }

        var pageCount = Math.Ceiling((double)(feedBacks.Count() / itemCount));
        var paginatedDtos = await feedBacks.OrderBy(x => x.name).Skip(page * (int)itemCount).Take((int)itemCount).ToListAsync();

        DtoPaginated<Toilet> paginated = new DtoPaginated<Toilet>(){ Data = paginatedDtos, ActualCount = feedBacks.Count() };

        return paginated;
    }

}
