import { Outlet } from "react-router-dom"
import { MakeInitSetup } from "src/main/factories"

export const MainOutlet: React.FC = () => {
  return (
    <div>
      <MakeInitSetup />
      <Outlet />
    </div>
  )
}
