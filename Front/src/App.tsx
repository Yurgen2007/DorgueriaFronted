import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home/Home";
import { InventarioSitio } from "./pages/Bodega/Inventario/Sitios/InventarioSitio";
import { Inventario } from "./pages/Bodega/Inventarios";
import Login from "./pages/Login";
import UsersTable from "./pages/Admin/usuarios";
import { RolTable } from "./pages/Admin/Roles";
import SitiosTable from "./pages/Admin/sitios";
import { ElementosTable } from "./pages/Bodega/Elementos";
import { UnidadTable } from "./pages/Bodega/UnidadesMedida";
import CategoriasTable from "./pages/Admin/categorias";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { CaracteristicasTable } from "./pages/Bodega/Caracteristicas";
import ResetPassword from "./pages/ResetPassword";
import Perfil from "./pages/Perfil";
import { AccesoPage } from "./pages/Admin/Acceso";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="admin/usuarios" element={<UsersTable />} />
          <Route path="admin/roles" element={<RolTable />} />
          <Route path="admin/acceso" element={<AccesoPage />} />
          <Route path="admin/sitios" element={<SitiosTable />} />
          <Route path="bodega/elementos" element={<ElementosTable />} />
          <Route path="bodega/unidades" element={<UnidadTable />} />
          <Route path="bodega/categorias" element={<CategoriasTable />} />
          <Route
            path="bodega/caracteristicas"
            element={<CaracteristicasTable />}
          />

          <Route path="bodega/inventario/" element={<Inventario />} />
          <Route
            path="bodega/inventario/areas/:id/sitios/:sitioId"
            element={<InventarioSitio />}
          />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/forgotPass" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;
