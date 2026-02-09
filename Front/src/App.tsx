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
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />
          <Route element={<Perfil />} path="perfil" />
          <Route element={<UsersTable />} path="admin/usuarios" />
          <Route element={<RolTable />} path="admin/roles" />
          <Route element={<AccesoPage />} path="admin/acceso" />
          <Route element={<SitiosTable />} path="admin/sitios" />
          <Route element={<ElementosTable />} path="bodega/elementos" />
          <Route element={<UnidadTable />} path="bodega/unidades" />
          <Route element={<CategoriasTable />} path="bodega/categorias" />
          <Route
            element={<CaracteristicasTable />}
            path="bodega/caracteristicas"
          />

          <Route element={<Inventario />} path="bodega/inventario/" />
          <Route
            element={<InventarioSitio />}
            path="bodega/inventario/areas/:id/sitios/:sitioId"
          />
        </Route>
      </Route>

      <Route element={<Login />} path="/login" />
      <Route element={<ForgotPassword />} path="/forgotPass" />
      <Route element={<ResetPassword />} path="/reset-password" />
      <Route element={<Perfil />} path="/perfil" />
    </Routes>
  );
}

export default App;
