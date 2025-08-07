export const dashboardService = {
  async getMetrics() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "label_c" } },
          { field: { Name: "value_c" } },
          { field: { Name: "trend_c" } },
          { field: { Name: "trend_direction_c" } },
          { field: { Name: "icon_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('dashboard_metric_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Map database fields to expected format
      return (response.data || []).map(metric => ({
        label: metric.label_c,
        value: metric.value_c,
        trend: metric.trend_c,
        trendDirection: metric.trend_direction_c,
        icon: metric.icon_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching metrics:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching metrics:", error.message);
        throw error;
      }
    }
  },

  async getRecentActivities() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "time_c" } },
          { field: { Name: "type_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 10,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('recent_activity_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Map database fields to expected format
      return (response.data || []).map(activity => ({
        Id: activity.Id,
        description: activity.description_c,
        contact: activity.contact_c,
        time: activity.time_c,
        type: activity.type_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching recent activities:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching recent activities:", error.message);
        throw error;
      }
    }
  }
};