import "./index.scss";
import React, { FC, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

import { DateRange, Range } from "react-date-range";
import { useTranslation } from "react-i18next";

const DashboardPage: FC = () => {
  const { t } = useTranslation();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection"
    }
  ]);

  return (
    <div>
      <Sidebar />
      <div className="dashboardContent">
        <div className="dashboardElement">
          <h2>{t("description.dashboardPart1")}</h2>
          <hr />
          <DateRange
            editableDateInputs={true}
            onChange={(item) =>
              setRange([
                {
                  startDate: item.selection.startDate,
                  endDate: item.selection.endDate,
                  key: "selection"
                }
              ])
            }
            moveRangeOnFirstSelection={false}
            ranges={range}
            className="dateRange"
            minDate={new Date()}
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
            weekStartsOn={1}
          />
        </div>
        <div className="dashboardElement">
          <h2>{t("description.dashboardPart2")}</h2>
          <hr />
        </div>
        <div className="dashboardElement">
          <h2>{t("description.dashboardPart3")}</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
