import "./index.scss";
import { FC, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

import { DateRange } from "react-date-range";
import { Range } from "react-date-range/index";

const Dashboard: FC = () => {
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
          <h2>calendar</h2>
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
          <h2>travel</h2>
          <hr />
        </div>
        <div className="dashboardElement">
          <h2>exemple post-it</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
