import Card from "@mui/material/Card";
const style = {
  bgcolor: "black",
  borderRadius: 2,
  boxShadow: 24,
};
const Loading = () => {
  return (
    <Card
      className="flex flex-grow items-center justify-center"
      sx={style}
      variant="outlined"
    >
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default Loading;
