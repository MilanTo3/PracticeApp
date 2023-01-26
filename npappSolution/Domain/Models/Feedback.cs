using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Domain.Models;

public class Feedback
{
    [Key]
    public long feedbackId{get;set;}
    public long toiletId{get;set;}
    public DateTime time{get;set;}
    public string gradeOverall{get;set;}
    public Toilet Toilet{get;set;}
    
}
