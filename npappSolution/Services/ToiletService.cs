using Domain.Repositories;
using ServicesAbstraction;
using Contracts;
using Domain.Models;
using Mapster;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Services;

public class ToiletService : IToiletService
{
    private readonly IRepositoryManager _repositoryManager;
    public ToiletService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<IEnumerable<ToiletDto>> GetAllAsync() {
        var users = await _repositoryManager.toiletRepository.getAll();

        var accountsDto = users.Adapt<IEnumerable<ToiletDto>>().ToList();

        return accountsDto;
    }

    public async Task<ToiletDto> GetByIdAsync(long toiletId) {
        var user = await _repositoryManager.toiletRepository.getById(toiletId);
        if(user is null){
            return null;
        }
        var userdto = user.Adapt<ToiletDto>();

        return userdto;
    }

    public async Task<ToiletDto> CreateAsync(ToiletDto toilet) {

        var account = toilet.Adapt<Toilet>();

        await _repositoryManager.toiletRepository.Add(account);
        await _repositoryManager.UnitOfWork.Complete();

        return account.Adapt<ToiletDto>();
    }

    public async Task<bool> DeleteAsync(long toiletId) {

        var account = await _repositoryManager.toiletRepository.getById(toiletId);
        if(account is null){
            return false;
        }
        
        bool deleted = false;

        if (account != null) {
            deleted = await _repositoryManager.toiletRepository.Delete(toiletId);

            await _repositoryManager.UnitOfWork.Complete();
        }

        return deleted;
    }

    public async Task<bool> UpdateAsync(ToiletDto dto)
    {
        
        var entity = dto.Adapt<Toilet>();
        bool updated = await _repositoryManager.toiletRepository.UpdateToilet(entity);
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

    public async Task<IEnumerable<string>> GetToiletNames(){

        var toilets = await _repositoryManager.toiletRepository.getAll();
        var names = toilets.Select(x => x.name);

        return names;
    }
}
