import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ReportIcon from "@mui/icons-material/Report";
import RestoreIcon from "@mui/icons-material/Restore";

import axios from "axios";
import { useEffect, useState } from "react";
import { Admin, Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import { customProvider } from "./common/utils";
import { firebaseConfig } from "./constants/firebaseConfig";
import { Category, CreateCategory, ShowCategory } from "./pages/Category";
import { Item } from "./pages/Item";
import LandingPage from "./pages/LandingPage";
import { PurchaseHistory } from "./pages/PurchaseHistory";
import { ReportedUsers } from "./pages/ReportedUsers";
import { User } from "./pages/User";
import { Waitlist } from "./pages/Waitlist";
import { LoginPage } from "./pages/auth/Login";

export const authProvider = FirebaseAuthProvider(firebaseConfig, {});
export const customAuthProvider = {
  ...authProvider,
  login: async (params: { email: string; password: string }) => {
    const user = await authProvider.login(params);
    const claims = await authProvider.getPermissions(params);

    if (claims.admin) {
      return Promise.resolve(user);
    }
    await authProvider.logout(params);
    throw new Error("Access denied");
  },
};

export const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://trucknearthsales.com.au/api/getData").then((res) => {
      setData(res.data[0]);
    });
  }, []);

  return (
    <Admin
      loginPage={LoginPage}
      authProvider={customAuthProvider}
      dataProvider={customProvider(customAuthProvider)}
    >
      <Resource
        name="user"
        list={User}
        icon={() => <AccountCircleIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="category"
        list={Category}
        create={CreateCategory}
        show={ShowCategory}
        icon={() => <CategoryIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="item"
        list={Item}
        icon={() => <FireTruckIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="purchase"
        list={PurchaseHistory}
        icon={() => <RestoreIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="reported-users"
        list={ReportedUsers}
        icon={() => <ReportIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="waitlist"
        list={Waitlist}
        icon={() => <PendingActionsIcon style={{ color: "#2196f3" }} />}
      />
      {data && (
        <Resource
          name="landing-page"
          list={LandingPage(data)}
          icon={() => <PendingActionsIcon style={{ color: "#2196f3" }} />}
        />
      )}
    </Admin>
  );
};
