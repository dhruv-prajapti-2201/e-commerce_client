import { Fragment, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./style/Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateUser } from "../redux/userSlice";
import { resetCart } from "../redux/cartSlice";
import Cart from "./Cart";
// import Cart from "../Cart/Cart";
// import { useSelector } from "react-redux";

type props = {
  isDisabled: boolean;
};

const Navbar = ({ isDisabled }: props) => {
  const [open, setOpen] = useState(false);

  const { user, cart } = useSelector((state: RootState) => {
    return state;
  });
  const dispacth: AppDispatch = useDispatch();
  const navigate=useNavigate();

  const onLogout = () => {
    localStorage.removeItem("userData");
    dispacth(resetCart({}));
    dispacth(updateUser({ name: "", isLoggedIn: false }));
    navigate('/');
  };

  return (
    <div className="navbar bg-blue-700 text-white sticky top-0">
      <div className="wrapper">
        <div className="left">
          <div className="center">
            <Link className="link" to="/">
              ShopMart
            </Link>
          </div>
          {!isDisabled && (
            <span className="ml-60">
              {user.username && `Welcome, ${user.username}`}
            </span>
          )}
        </div>
        <div className="right">
          {user && !user.isLoggedIn && !isDisabled && (
            <Fragment>
              <div className="item">
                <Link className="link" to="/signin">
                  Login
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/signup">
                  Register
                </Link>
              </div>
            </Fragment>
          )}
          {user && user.isLoggedIn && !isDisabled && (
            <Fragment>
              <div>
                <div className="item">
                <Link className="link" to="/user/order">
                  My orders
                </Link>
                </div>
              </div>
              <div>
                <div className="item">
                  <span className="link cursor-pointer" onClick={onLogout}>
                    logout
                  </span>
                </div>
              </div>
            </Fragment>
          )}
          {!isDisabled && (
            <div className="icons">
              <div
                className="cartIcon text-white"
                onClick={() => setOpen(!open)}
              >
                <ShoppingCartOutlinedIcon />
                <span>{cart !== undefined && cart.items?.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {open && <Cart onCloseModel={setOpen} />}
    </div>
  );
};

export default Navbar;
