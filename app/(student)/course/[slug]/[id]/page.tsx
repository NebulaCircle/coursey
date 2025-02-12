import React from "react";
import Navbar from "../../../../components/frontend/Navbar";
import Video from "./Video";
import ModuleList from "./ModuleList";
import { useFetchServer } from "@/hooks/useFetch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCourseBySlug } from "@/actions/coursesAction";

const page = async ({
  params: { slug, id },
}: {
  params: { slug: string; id: string };
}) => {
  const { data: course } = await getCourseBySlug(slug);
  const { data: module } = await useFetchServer(`/modules/` + id);

  if (course?.length == 0 || module?.length == 0) {
    return (
      <>
        <h1>Tidak ada data</h1>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Link
        href="/courses"
        className="border px-4 py-2 rounded-md mt-4 ms-4 items-center gap-2  inline-flex bg-slate-800 text-white text-sm hover:bg-slate-800/90"
      >
        <ArrowLeft className="w-5" /> Back to Courses
      </Link>
      <main className="px-4 grid grid-cols-6  gap-5 mx-auto md:w-[95%]  py-8">
        <div className="md:col-span-4 col-span-6">
          <Video module={module} purchased={course?.purchased} />
        </div>
        <div className="md:col-span-2  col-span-6">
          <ModuleList modules={course?.modules} purchased={course?.purchased} />
        </div>
      </main>
    </>
  );
};

export default page;
