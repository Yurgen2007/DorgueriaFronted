import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import React, { useState } from "react";

type TabItem = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type Props = {
  tabs: TabItem[];
};

export default function Tap({ tabs }: Props) {
  const [selectedKey, setSelectedKey] = useState(tabs[0]?.key || "");
  const selectedTab = tabs.find((tab) => tab.key === selectedKey);

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Report Tabs"
            selectedKey={selectedKey}
            variant="light"
            onSelectionChange={(key) => setSelectedKey(String(key))}
          >
            {tabs.map(({ key, title }) => (
              <Tab
                key={key}
                title={
                  <span className="px-4 py-2 text-sm transition-colors whitespace-nowrap">
                    {title}
                  </span>
                }
              />
            ))}
          </Tabs>

          {selectedTab && <div className="mt-4">{selectedTab.content}</div>}
        </div>
      </CardBody>
    </Card>
  );
}
