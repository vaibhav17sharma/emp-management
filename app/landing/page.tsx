import RandomQuote from "@/components/common/RandomQuote";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Landing = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            <span className="sm:block">
              {" "}
              Heyyy {session?.user?.name || "There"} !
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href={
                role && ["ADMIN", "HR"].includes(role)
                  ? "/admin/dashboard"
                  : role && ["EMPLOYEE"].includes(role)
                  ? "/employee/dashboard"
                  : "/signin"
              }
            >
              Go to Dashboard
            </Link>
          </div>
          <div className="mx-auto mt-[100px] max-w-xl sm:text-xl/relaxed">
            <RandomQuote />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
