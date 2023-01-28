using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public class User
{
    [Key]
    public long userId { get; set; }
    public string name { get; set; }
    public string lastname{get;set;}
    [EmailAddress]
    public string email { get; set; }
    public string password { get; set; }
    public string role { get; set; }
}
