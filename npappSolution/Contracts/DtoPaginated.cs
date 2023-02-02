namespace Contracts;

public class DtoPaginated<T>
{
    public List<T> Data{get;set;}
    public long ActualCount{get;set;}
}
