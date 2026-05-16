type AdminStatsProps = {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalMessages: number;
    totalConversations: number;
  } | null;
};

function AdminStats({ stats }: AdminStatsProps) {
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-slate-800 p-5 rounded-2xl">
          <p className="text-slate-400">{key}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;