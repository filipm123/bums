import SideBar from "./SideBar";
const Dashboard = () => {
  return (
    <div className="flex flex-grow ">
      <SideBar />
      <div className='flex justify-center items-center flex-grow'><p className='text-4xl'>Pick a project or create one!</p></div>
    </div>
  );
};

export default Dashboard;
