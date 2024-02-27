import React, { useState } from "react";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import { IoIosArrowDown } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
type TTabViewProps = {
  tabs: TTab[];
};

const data = [
  { title: "Online Store Sessions", value: "255581" },
  { title: "Net return value", value: "-1507.44" },
  { title: "Total Orders", value: "10511" },
  { title: "Conversion Rate", value: "3.18%" },
];

export const TabView = ({ tabs }: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index === activeTab ? 0 : index);
  };
  return (
    <div className="mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md">
      <div className="flex px-16">
        {data?.map((metric, index) => (
          <div
            className="flex flex-col flex-1 p-4 rounded-lg"
            onClick={() => handleTabClick(index)}
            
            style={{
              background: activeTab === index ? "#F1F1F1" : "",
              cursor: "pointer",
              
            }}
            
          >
            <div className="flex items-center justify-between">
              <p>{metric.title}</p>
              <div>{activeTab === index && <FaPencil color="#787878" />}</div>
            </div>
            <p>{metric.value}</p>
          </div>
        ))}
        <div className="flex items-center">
          <IoIosArrowDown />
        </div>
      </div>
      <div className="mx-auto">
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
