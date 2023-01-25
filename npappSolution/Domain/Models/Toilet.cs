using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Domain.Models;

public class Toilet
{
    [Key]
    public long toiletId{get;set;}
    public string name{get;set;}
    public string location{get;set;}
    public string gender{get;set;}
    

}