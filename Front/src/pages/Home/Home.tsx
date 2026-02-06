import { useElemento } from "@/hooks/Elementos/useElemento";
import { useInventario } from "@/hooks/Inventarios/useInventario";
import { InventarioDashboard } from "@/components/organismos/Inventarios/InventarioDashboard";

const Dashboard = () => {
  const { elementos = [] } = useElemento();
  const { inventarios = [] } = useInventario();

  return (
    <div className="p-4 space-y-6">
      {/* Dashboard de Inventario */}
      <InventarioDashboard />
    </div>
  );
};

export default Dashboard;
