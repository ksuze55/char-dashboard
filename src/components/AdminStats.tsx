type AdminStatsProps = {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalMessages: number;
    totalConversations: number;
  } | null;
};

function AdminStats({ stats }: AdminStatsProps) {
  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        marginBottom: "2rem"
      }}
    >
      <div style={{ border: "1px solid gray", padding: "1rem" }}>
        <p>Total Users</p>
        <h2>{stats.totalUsers}</h2>
      </div>

      <div style={{ border: "1px solid gray", padding: "1rem" }}>
        <p>Active Users</p>
        <h2>{stats.activeUsers}</h2>
      </div>

      <div style={{ border: "1px solid gray", padding: "1rem" }}>
        <p>Total Messages</p>
        <h2>{stats.totalMessages}</h2>
      </div>

      <div style={{ border: "1px solid gray", padding: "1rem" }}>
        <p>Total Conversations</p>
        <h2>{stats.totalConversations}</h2>
      </div>
    </div>
  );
}

export default AdminStats;