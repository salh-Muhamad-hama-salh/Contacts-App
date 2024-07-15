import Logo from "../assets/logos_firebase.png";

function Navbar() {
  return (
    <div className="h-[60px] gap-2 text-xl font-medium bg-white rounded-lg my-4 flex items-center justify-center">
      <img src={Logo} />
      <h1>Firebase Contact App</h1>
      
    </div>
  );
}

// create navbar component

export default Navbar;
