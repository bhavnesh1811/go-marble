import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { IChartDatum, TTab } from "../../interfaces";

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("1-6");

  const filters: CrudFilter[] = [
    {
      field: "id",
      operator: "gte",
      value: selectedDate?.split("-")[0],
    },
    {
      field: "id",
      operator: "lte",
      value: selectedDate?.split("-")[1],
    },
  ];

  const { data: monthlyData } = useList<IChartDatum>({
    resource: "dummyData",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value: item?.onlineStoreSessions,
      }));
    }, [d]);
  };
  const useMemoizedNetReturnValue = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value: item?.netReturnValue,
      }));
    }, [d]);
  };
  const useMemoizedMonthlyOrders = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value: item?.totalOrders,
      }));
    }, [d]);
  };
  const useMemoizedMonthlyConversionData = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value: item?.conversionRate,
      }));
    }, [d]);
  };
  const useMemoizedChartData1 = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value1: item?.onlineStoreSessions,
      }));
    }, [d]);
  };
  const useMemoizedNetReturnValue1 = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
        value1: item?.netReturnValue,
      }));
    }, [d]);
  };
  const useMemoizedMonthlyOrders1 = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value1: item?.totalOrders,
      }));
    }, [d]);
  };
  const useMemoizedMonthlyConversionData1 = (d: any) => {
    return useMemo(() => {
      return d?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        month:item.month,
       
        value1: item?.conversionRate,
      }));
    }, [d]);
  };


  

  const memoizedOnlineStoreData = useMemoizedChartData(monthlyData);
  const memoizedNetReturnValue = useMemoizedNetReturnValue(monthlyData);
  const memoizedMonthlyOrdersData = useMemoizedMonthlyOrders(monthlyData);
  const memoizedMonthlyConversionData =
    useMemoizedMonthlyConversionData(monthlyData);

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Monthly Online Store Sessions",
      content: (
        <ResponsiveLineChart
          kpi="Monthly Online Store Sessions"
          data={memoizedOnlineStoreData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Monthly Return Value",
      content: (
        <ResponsiveBarChart
          kpi="Monthly Return Value"
          data={memoizedNetReturnValue}
          // secondData={memoizedNetReturnValue1}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "Monthly Orders",
      content: (
        <ResponsiveLineChart
          kpi="Monthly Orders"
          data={memoizedMonthlyOrdersData}
          
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 4,
      label: "Monthly Conversion",
      content: (
        <ResponsiveLineChart
          kpi="Monthly Conversion"
          data={memoizedMonthlyConversionData}
          
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <TabView
        monthlyData={monthlyData}
        tabs={tabs}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};
