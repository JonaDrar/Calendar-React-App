import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";
import "./login.css";

const loginInit = {
  loginEmail: "",
  loginPassword: "",
}

const registerInit = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
}

export const LoginPage = () => {

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginInit);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm(registerInit);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({email:loginEmail, password:loginPassword})
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    startRegister({name:registerName, email:registerEmail, password:registerPassword})

  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error de autenticación', errorMessage, 'error');
    }
  
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form
            onSubmit={loginSubmit}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit w-100" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form
            onSubmit={registerSubmit}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit w-100" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
