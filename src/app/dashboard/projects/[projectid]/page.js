import SideBar from "@/app/components/SideBar";
import Project from "@/app/components/Project";
export default function ProjectPage({ params }) {
  return (
    <div className="flex flex-grow">
      <SideBar />
      <Project />
    </div>
  );
}
