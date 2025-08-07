const tableName = 'deal_c';

export const dealService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "value_c" } },
          { field: { Name: "expected_close_date_c" } },
          { field: { Name: "stage_c" } },
          { field: { Name: "probability_percentage_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "last_activity_date_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching deals:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching deals:", error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "value_c" } },
          { field: { Name: "expected_close_date_c" } },
          { field: { Name: "stage_c" } },
          { field: { Name: "probability_percentage_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "last_activity_date_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching deal with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching deal with ID ${id}:`, error.message);
        throw error;
      }
    }
  },

  async create(dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const mappedData = {
Name: dealData.Name || dealData.name,
        value_c: parseFloat(dealData.value_c || dealData.value || 0),
        expected_close_date_c: this.formatDateForAPI(dealData.expected_close_date_c || dealData.expectedCloseDate),
        stage_c: dealData.stage_c || dealData.stage || "Lead",
        probability_percentage_c: parseInt(dealData.probability_percentage_c || dealData.probability || 0),
        company_c: parseInt(dealData.company_c || dealData.companyId),
        last_activity_date_c: new Date().toISOString().split('T')[0]
      };

      const params = {
        records: [mappedData]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create deals ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating deal:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating deal:", error.message);
        throw error;
      }
    }
  },

  async update(id, dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const mappedData = {
        Id: parseInt(id)
      };

      // Only add fields that are provided
      if (dealData.Name !== undefined) mappedData.Name = dealData.Name;
      if (dealData.value_c !== undefined) mappedData.value_c = parseFloat(dealData.value_c);
      if (dealData.expected_close_date_c !== undefined) mappedData.expected_close_date_c = dealData.expected_close_date_c;
      if (dealData.stage_c !== undefined) mappedData.stage_c = dealData.stage_c;
if (dealData.probability_percentage_c !== undefined) mappedData.probability_percentage_c = parseInt(dealData.probability_percentage_c);
      if (dealData.company_c !== undefined) mappedData.company_c = parseInt(dealData.company_c);
      if (dealData.last_activity_date_c !== undefined) mappedData.last_activity_date_c = dealData.last_activity_date_c;
      if (dealData.expected_close_date_c !== undefined) mappedData.expected_close_date_c = this.formatDateForAPI(dealData.expected_close_date_c);
      const params = {
        records: [mappedData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update deals ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating deal:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating deal:", error.message);
        throw error;
      }
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete deals ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return response.results.some(result => result.success);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting deal:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting deal:", error.message);
        throw error;
      }
    }
  }
};