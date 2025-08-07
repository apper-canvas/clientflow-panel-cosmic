import dashboardData from "@/services/mockData/dashboard.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardService = {
  async getMetrics() {
    await delay(300)
    return [...dashboardData.metrics]
  },

  async getRecentActivities() {
    await delay(200)
    return [...dashboardData.recentActivities]
  }
}