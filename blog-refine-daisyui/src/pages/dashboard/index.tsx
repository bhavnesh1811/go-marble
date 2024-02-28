import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
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
        value: item?.onlineStoreSessions,
        value1: item?.onlineStoreSessions1,
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
        value: item?.netReturnValue,
        value1: item?.netReturnValue1,
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
        value: item?.totalOrders,
        value1: item?.totalOrders1,
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
        value: item?.conversionRate,
        value1: item?.conversionRate1,
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
        <ResponsiveLineChart
          kpi="Monthly Return Value"
          data={memoizedNetReturnValue}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
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
