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

    public async Task<IEnumerable<FeedbackDto>> GetToiletFeedbacks(long toiletId) {
        var toilet = await _repositoryManager.toiletRepository.getWithFeedbacks(toiletId);

        var fbackDtos = toilet.Feedbacks.Adapt<IEnumerable<FeedbackDto>>();

        return fbackDtos;
    }

    public async Task<SummaryDto> GetSummary(long toiletId){

        var toilet = await _repositoryManager.toiletRepository.getWithFeedbacks(toiletId);
        var summaryDto = toilet.Adapt<SummaryDto>();
        summaryDto.totalCnt = toilet.Feedbacks.Count;
        summaryDto.badCnt = toilet.Feedbacks.Where(x => x.gradeOverall == "Bad").Count();
        summaryDto.averageCnt = toilet.Feedbacks.Where(x => x.gradeOverall == "Average").Count();
        summaryDto.goodCnt = toilet.Feedbacks.Where(x => x.gradeOverall == "Good").Count();

        return summaryDto;
    }

    public async Task<FeedbackDto> GetByIdAsync(long feedbackId) {
        var fback = await _repositoryManager.feedbackRepository.getById(feedbackId);
        if(fback is null){
            return null;
        }
        var fbackdto = fback.Adapt<FeedbackDto>();

        return fbackdto;
    }

    private bool checkFeedback(FeedbackDto dto){

        return dto.dirtyBasin || dto.dirtyBowl || dto.dirtyFloor || dto.faultyEquipment || dto.foulSmell || dto.litterBin || dto.noPaper || dto.noSoap || dto.noTissues || dto.wetFloor;
    }

    public async Task<FeedbackDto> CreateAsync(FeedbackDto feedback) {

        if(feedback.gradeOverall == "Bad" && checkFeedback(feedback) == false){
            return null;
        }

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

    public async Task<IEnumerable<ReportDto>> GetReports(long toiletId){

        List<ReportDto> reportDto = new List<ReportDto>();
        if(toiletId != -1){
            var toilet = await _repositoryManager.toiletRepository.getWithFeedbacks(toiletId);
            reportDto = new List<ReportDto>();

            foreach(Feedback fback in toilet.Feedbacks){
                Toilet temp = await _repositoryManager.toiletRepository.getById(fback.toiletId);
                ReportDto dto = fback.Adapt<ReportDto>();
                dto.name = temp.name;
                dto.location = temp.location;
                reportDto.Add(dto);
            }
        }else{
            var toilet = await _repositoryManager.toiletRepository.getAllWithFeedbacks();
            List<Feedback> list = new List<Feedback>();

            foreach(var feedbackList in toilet.Select(x => x.Feedbacks)){
                list.AddRange(feedbackList);
            }

            foreach(Feedback fback in list){
                Toilet temp = await _repositoryManager.toiletRepository.getById(fback.toiletId);
                ReportDto dto = fback.Adapt<ReportDto>();
                dto.name = temp.name;
                dto.location = temp.location;
                reportDto.Add(dto);
            }
        }

        return reportDto;
    }

}
