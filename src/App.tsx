// mui icon list
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import MailIcon from "@mui/icons-material/Mail";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ReportIcon from "@mui/icons-material/Report";
import RestoreIcon from "@mui/icons-material/Restore";

// Themes
import indigo from "@mui/material/colors/indigo";
import red from "@mui/material/colors/red";
import { Admin, defaultTheme } from "react-admin";

import { blue } from "@mui/material/colors";
import { Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import { customProvider } from "./common/utils";
import { firebaseConfig } from "./constants/firebaseConfig";
import { ContactHelpList } from "./pages/ContactHelp";
import { Product, ShowProduct } from "./pages/Item";
import { PurchaseHistory, ShowPurchaseHistory } from "./pages/PurchaseHistory";
import { ReportedUsers } from "./pages/ReportedUsers";
import { ShowUser, User } from "./pages/User";
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

const myTheme = {
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: indigo,
    secondary: blue,
    error: red,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    ...defaultTheme.components,
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
  },
};

export const App = () => {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={customAuthProvider}
      dataProvider={customProvider(customAuthProvider)}
      theme={myTheme}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      <Resource
        name="user"
        list={User}
        show={ShowUser}
        icon={() => <AccountCircleIcon style={{ color: "#2196f3" }} />}
      />
      {/* <Resource
        name="category"
        list={Category}
        create={CreateCategory}
        show={ShowCategory}
        icon={() => <CategoryIcon style={{ color: "#2196f3" }} />}
      /> */}
      <Resource
        name="product"
        list={Product}
        show={ShowProduct}
        icon={() => <FireTruckIcon style={{ color: "#2196f3" }} />}
      />
      <Resource
        name="purchase"
        list={PurchaseHistory}
        show={ShowPurchaseHistory}
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
      <Resource
        name="contact-help"
        list={ContactHelpList}
        icon={() => <MailIcon style={{ color: "#2196f3" }} />}
      />
    </Admin>
  );
};
