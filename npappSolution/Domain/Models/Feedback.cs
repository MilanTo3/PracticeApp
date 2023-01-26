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

    //public string info{get;set;}

    public bool foulSmell{get;set;} //0
    public bool dirtyBowl{get;set;} //1
    public bool noPaper{get;set;} //2
    public bool noSoap{get;set;} //3
    public bool dirtyFloor{get;set;} //4
    public bool wetFloor{get;set;} //5
    public bool faultyEquipment{get;set;} //6
    public bool litterBin{get;set;} //7
    public bool noTissues{get;set;} //8
    public bool dirtyBasin{get;set;} //9

}
