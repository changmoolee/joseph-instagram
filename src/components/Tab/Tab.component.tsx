"use client";
import React from "react";

interface ITabProps {
  /**
   * className
   */
  className?: string;
  /**
   * 각 탭의 이름이 담긴 배열
   */
  tabArr: string[];
  /**
   * 탭 초기값
   */
  defaultTab?: string;
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
    className,
    tabArr,
    onChange = (selectedTab: string) => console.log(selectedTab),
  } = props;

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(
    props.defaultTab || tabArr[0]
  );

  React.useEffect(() => {
    if (clickedTab) {
      onChange(clickedTab);
    }
  }, [clickedTab, onChange]);

  return (
    <section
      className={`flex h-[50px] w-full min-w-[320px] items-center justify-center ${className}`}
    >
      {tabArr.map((tab: string, index: number) => (
        <button
          key={tab}
          className="border-gray flex h-full w-full justify-center border-t-[2px] border-solid"
          onClick={() => {
            setClickedTab(tab);
          }}
        >
          <div
            className={`flex h-full w-auto items-center justify-center border-t-[1px] border-solid ${
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
