import { useAuthStore } from "../../hooks/useAuthStore";



export const NavBar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mmb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            &nbsp;
            <span>{user.name}</span>
        </span>
        <button 
          className="btn btn-outline-danger"
          onClick={startLogout}
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
