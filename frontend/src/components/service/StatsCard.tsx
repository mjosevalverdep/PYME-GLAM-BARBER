interface StatsCardProps {
    stats: {
      totalServices: number;
      mostExpensiveService: {
        name: string;
        price: number;
      };
    };
  }
  
  export default function StatsCard({ stats }: StatsCardProps) {
    return (
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Estadísticas de Servicios</h2>
        <p>Total de servicios: {stats.totalServices}</p>
        <p>
          Servicio más caro: ${stats.mostExpensiveService.price} ({stats.mostExpensiveService.name})
        </p>
      </div>
    );
  }
  