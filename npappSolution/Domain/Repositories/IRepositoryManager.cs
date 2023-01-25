using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories;

public interface IRepositoryManager
{
    IUnitofWork UnitOfWork {get;}
    IUserRepository userRepository{get;}
    IToiletRepository toiletRepository{get;}
    IFeedbackRepository feedbackRepository{get;}
}
