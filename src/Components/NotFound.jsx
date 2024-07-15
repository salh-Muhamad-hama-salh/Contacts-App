import imageNOtfound from "../assets/Hands Contact.png";
function NotFound() {
  return (
    <div className="flex gap-4 justify-center items-center flex-col h-[80vh]">
      <div>
        <img src={imageNOtfound} alt="" />
      </div>
      <h1 className="text-white text-2xl font-semibold">User NOT Found</h1>
    </div>
  );
}

export default NotFound;
