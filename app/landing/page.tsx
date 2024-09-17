import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Landing = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "ADMIN" || role === "HR") {
    return <div>Admin Landing</div>;
  } else if (role === "EMPLOYEE") {
    return <div>Employee Landing</div>;
  }
};

export default Landing;
