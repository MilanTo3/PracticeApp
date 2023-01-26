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

public class FeedbackService : IFeedbackService
{

private readonly IRepositoryManager _repositoryManager;
    public FeedbackService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<IEnumerable<FeedbackDto>> GetAllAsync() {
        var fback = await _repositoryManager.feedbackRepository.getAll();

        var accountsDto = fback.Adapt<IEnumerable<FeedbackDto>>();

        return accountsDto;
    }

    public async Task<FeedbackDto> GetByIdAsync(long feedbackId) {
        var fback = await _repositoryManager.feedbackRepository.getById(feedbackId);
        if(fback is null){
            return null;
        }
        var fbackdto = fback.Adapt<FeedbackDto>();

        return fbackdto;
    }

    public async Task<FeedbackDto> CreateAsync(FeedbackDto feedback) {

        var account = feedback.Adapt<Feedback>();
        account.time = DateTime.Now;

        await _repositoryManager.feedbackRepository.Add(account);
        await _repositoryManager.UnitOfWork.Complete();

        return account.Adapt<FeedbackDto>();
    }

    public async Task<bool> DeleteAsync(long feedbackId) {

        var account = await _repositoryManager.feedbackRepository.getById(feedbackId);
        if(account is null){
            return false;
        }
        
        bool deleted = false;

        if (account != null) {
            deleted = await _repositoryManager.feedbackRepository.Delete(feedbackId);

            await _repositoryManager.UnitOfWork.Complete();
        }

        return deleted;
    }

}
