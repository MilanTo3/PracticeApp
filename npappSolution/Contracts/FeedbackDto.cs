namespace Contracts;

public class FeedbackDto
{
    public long feedbackId{get;set;}
    public long toiletId{get;set;}
    public DateTime time {get;set;}
    public string gender{get;set;}
    public string gradeOverall{get;set;}
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
