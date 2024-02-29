import React, { useEffect, useState } from "react";
import { TabPanel } from "./TabPanel";
import { IChartDatum, TTab } from "../../interfaces";
import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import { Skeleton, Divider } from "@chakra-ui/react";
type TTabViewProps = {
  monthlyData: any;
  tabs: TTab[];
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const TabView = ({
  monthlyData,
  tabs,
  selectedDate,
  setSelectedDate,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [clicked, setIsClicked] = useState<boolean>(false);

  const data = [
    {
      title: "Online Store Sessions",
      value: monthlyData?.data?.reduce(
        (total: number, item: IChartDatum) =>
          total + Number(item.onlineStoreSessions),
        0
      ),
      secondValue: monthlyData?.data?.reduce(
        (total: number, item: IChartDatum) =>
          total + Number(item.onlineStoreSessions1),
        0
      ),
    },
    {
      title: "Net return value",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.netReturnValue),
          0
        )
        .toFixed(2),
      secondValue: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.netReturnValue1),
          0
        )
        .toFixed(2),
    },
    {
      title: "Total Orders",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.totalOrders),
          0
        )
        .toFixed(2),
      secondValue: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.totalOrders1),
          0
        )
        .toFixed(2),
    },
    {
      title: "Conversion Rate",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.conversionRate),
          0
        )
        .toFixed(2),
      secondValue: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.conversionRate1),
          0
        )
        .toFixed(2),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, [data]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="py-4 bg-[#FFFFFF] border rounded-lg shadow-lg">
      <div className="flex justify-end items-center gap-8 mr-16 mb-2 cursor-pointer hover:cursor-pointer">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="1-6">February 2022-July 2022</option>
          <option value="7-12"> August 2022-January 2023</option>
          <option value="13-18">February 2023-July 2023</option>
          <option value="19-25">August 2023-January 2024</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex px-8 gap-4 mb-4">
        {data?.map((metric, index) => (
          <div
            className="flex flex-col flex-1 p-4 rounded-lg gap-3 w-full lg:w-[80%]"
            onClick={() => handleTabClick(index)}
            key={index}
            style={{
              background: activeTab === index ? "#F1F1F1" : "white",
              cursor: "pointer",
            }}
          >
            <Skeleton isLoaded={loading} width={"90%"}>
              <div className="flex items-center justify-between">
                <p>{metric.title}</p>
                <div>{activeTab === index && <FaPencil color="#787878" />}</div>
              </div>
              <Divider variant="dashed" />
            </Skeleton>
            <Skeleton isLoaded={loading} h="28px">
              <div className="flex items-center gap-6">
                <div className="font-bold text-[20px]">
                  {metric.title === "Net return value"
                    ? `$${metric.value}`
                    : metric.value?.toLocaleString()}
                </div>
                <div className="flex items-center gap-[2px]">
                  <span>
                    {Number(
                      (metric.secondValue - metric.value) /
                        Math.abs(metric.value)
                    ) *
                      100 >
                    0 ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </span>
                  <span>
                    {(
                      ((metric.secondValue - metric.value) /
                        Math.abs(metric.value)) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </div>
              </div>
            </Skeleton>
          </div>
        ))}
        <div
          className="flex items-center cursor-pointer md:col-span-2 min-[320px]:justify-center"
          onClick={() => setIsClicked(!clicked)}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <Skeleton isLoaded={loading}>
        <div
          className="mx-auto"
          style={{ display: clicked ? "none" : "block" }}
        >
          {tabs?.map((tab: TTab, index: number) => (
            <TabPanel key={tab?.id} isActive={index === activeTab}>
              {tab?.content}
            </TabPanel>
          ))}
        </div>
      </Skeleton>
    </div>
  );
};
