"use client";
import React from "react";

interface ITabProps {
  /**
   * 각 탭의 이름이 담긴 배열
   */
  tabArr: string[];
  /**
   * 현재 선택된 탭
   */
  onChange?: (selectedTab: string) => void;
}

/**
 * Tab 컴포넌트
 */
export default function Tab(props: ITabProps) {
  // props
  const {
    tabArr,
    onChange = (selectedTab: string) => console.log(selectedTab),
  } = props;

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabArr[0]);

  React.useEffect(() => {
    if (clickedTab) {
      onChange(clickedTab);
    }
  }, [clickedTab, onChange]);

  return (
    <section className="w-full h-[50px] flex justify-center items-center">
      {tabArr.map((tab: string, index: number) => (
        <button
          key={tab}
          className="w-[200px] h-full flex justify-center border-solid border-t-[2px] border-gray"
          onClick={() => {
            setClickedTab(tab);
          }}
        >
          <div
            className={`w-[100px] h-full flex justify-center items-center border-solid border-t-[1px] ${
              clickedTab === tab
                ? "border-black font-bold"
                : "border-transparent"
            } `}
          >
            {tab}
          </div>
        </button>
      ))}
    </section>
  );
}
