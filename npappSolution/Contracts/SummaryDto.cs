namespace Contracts;

public class SummaryDto
{
    public long toiletId{get;set;}
    public string name{get;set;}
    public string location {get;set;}
    public DateTime time{get;set;}
    public long totalCnt{get;set;}
    public long goodCnt{get;set;}
    public long averageCnt{get;set;}
    public long badCnt{get;set;} 
}
