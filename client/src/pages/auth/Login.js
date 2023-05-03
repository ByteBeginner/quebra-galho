import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";


export default function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location => ", location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });
      // console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login realizado com sucesso");        
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Login falhou. Tente novamente.");      
    }
  };

  return (
    <div>
      <Jumbotron title="Login" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
