using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracts;

namespace Domain.Repositories;

public interface IUserRepository: IGenericRepository<User>
{
    Task<User> LoginUserAsync(string email, string password);
    Task<User> GetbyEmail(string email);
}
