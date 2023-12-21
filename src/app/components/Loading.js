import Card from "@mui/material/Card";

const Loading = () => {
  return (
    <div className='flex flex-grow justify-center items-center'>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
