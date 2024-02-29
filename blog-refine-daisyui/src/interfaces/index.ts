export interface IChartDatum {
  date: string;
  date1: string;
  onlineStoreSessions: number;
  netReturnValue:string;
  totalOrders:number;
  conversionRate:string
  onlineStoreSessions1: number;
  netReturnValue1:string;
  totalOrders1:number;
  conversionRate1:string
  
}

export type TTab = {
  id: number;
  label: string;
  content: JSX.Element;
};
