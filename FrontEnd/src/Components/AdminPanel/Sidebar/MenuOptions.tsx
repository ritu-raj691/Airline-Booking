import DashboardIcon from "@mui/icons-material/Dashboard";
import FlightIcon from "@mui/icons-material/Flight";
import Inventory2Icon from "@mui/icons-material/Inventory2";
export default function () {
  const data = [
    {
      id: 1,
      label: "Dep-Return New",
      topLabel: "Departure And Return Details",
      img: (
        <div>
          <FlightIcon style={{ transform: "rotate(45deg)" }} />
          <FlightIcon style={{ transform: "rotate(225deg)" }} />
        </div>
      ),
      path: "/admin/inventory/return",
    },
    ,
    {
      id: 2,
      label: "Oneway New",
      topLabel: "Oneway Details",
      img: <FlightIcon style={{ transform: "rotate(45deg)" }} />,
      path: "/admin/inventory/oneway",
    },
    {
      id: 3,
      label: "Inventory",
      topLabel: "Inventory Details",
      img: <Inventory2Icon />,
      path: "/admin/inventory",
    },
  ];
  return data;
}
