import { toast } from 'react-toastify';

class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task_c';
  }

  async getAll(filters = {}) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "deal_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "due_date_c",
            sorttype: "ASC"
          }
        ]
      };

      // Add status filter if specified
      if (filters.status) {
        params.where = [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: [filters.status]
          }
        ];
      }

      // Add priority filter if specified
      if (filters.priority) {
        const existingWhere = params.where || [];
        existingWhere.push({
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [filters.priority]
        });
        params.where = existingWhere;
      }

      // Add contact filter if specified
      if (filters.contact) {
        const existingWhere = params.where || [];
        existingWhere.push({
          FieldName: "contact_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.contact)]
        });
        params.where = existingWhere;
      }

      // Add deal filter if specified
      if (filters.deal) {
        const existingWhere = params.where || [];
        existingWhere.push({
          FieldName: "deal_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.deal)]
        });
        params.where = existingWhere;
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("Failed to fetch tasks");
      }
      return [];
    }
  }

async getDueToday(filters = {}) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const whereClause = [
        {
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: ["Open"]
        },
        {
          FieldName: "due_date_c",
          Operator: "ExactMatch",
          SubOperator: "Day",
          Values: [new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })]
        }
      ];

      // Add filters
      if (filters.contact) {
        whereClause.push({
          FieldName: "contact_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.contact)]
        });
      }

      if (filters.deal) {
        whereClause.push({
          FieldName: "deal_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.deal)]
        });
      }

      if (filters.priority) {
        whereClause.push({
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [filters.priority]
        });
      }

      if (filters.type) {
        whereClause.push({
          FieldName: "type_c",
          Operator: "EqualTo",
          Values: [filters.type]
        });
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "deal_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ],
        where: whereClause,
        orderBy: [
          {
            fieldName: "due_date_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching due today tasks:", error.message);
      return [];
    }
  }

async getUpcoming(filters = {}) {
    try {
      const whereClause = [
        {
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: ["Open"]
        },
        {
          FieldName: "due_date_c",
          Operator: "GreaterThan",
          Values: [new Date().toISOString()]
        }
      ];

      // Add filters
      if (filters.contact) {
        whereClause.push({
          FieldName: "contact_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.contact)]
        });
      }

      if (filters.deal) {
        whereClause.push({
          FieldName: "deal_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.deal)]
        });
      }

      if (filters.priority) {
        whereClause.push({
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [filters.priority]
        });
      }

      if (filters.type) {
        whereClause.push({
          FieldName: "type_c",
          Operator: "EqualTo",
          Values: [filters.type]
        });
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "deal_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ],
        where: whereClause,
        orderBy: [
          {
            fieldName: "due_date_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching upcoming tasks:", error.message);
      return [];
    }
  }

async getCompleted(filters = {}) {
    try {
      const whereClause = [
        {
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: ["Completed"]
        }
      ];

      // Add filters
      if (filters.contact) {
        whereClause.push({
          FieldName: "contact_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.contact)]
        });
      }

      if (filters.deal) {
        whereClause.push({
          FieldName: "deal_c",
          Operator: "EqualTo",
          Values: [parseInt(filters.deal)]
        });
      }

      if (filters.priority) {
        whereClause.push({
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [filters.priority]
        });
      }

      if (filters.type) {
        whereClause.push({
          FieldName: "type_c",
          Operator: "EqualTo",
          Values: [filters.type]
        });
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "deal_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ],
        where: whereClause,
        orderBy: [
          {
            fieldName: "ModifiedOn",
            sorttype: "DESC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching completed tasks:", error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "contact_c" } },
          { field: { Name: "deal_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);

      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(taskData) {
    try {
      const params = {
        records: [
          {
            Name: taskData.Name,
            description_c: taskData.description_c,
            priority_c: taskData.priority_c,
            due_date_c: taskData.due_date_c,
            contact_c: taskData.contact_c ? parseInt(taskData.contact_c) : null,
            deal_c: taskData.deal_c ? parseInt(taskData.deal_c) : null,
            type_c: taskData.type_c,
            status_c: "Open",
            notes_c: taskData.notes_c || ""
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Task created successfully!");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("Failed to create task");
      }
      return null;
    }
  }

  async update(id, taskData) {
    try {
      const updateData = {
        Id: parseInt(id),
        Name: taskData.Name,
        description_c: taskData.description_c,
        priority_c: taskData.priority_c,
        due_date_c: taskData.due_date_c,
        contact_c: taskData.contact_c ? parseInt(taskData.contact_c) : null,
        deal_c: taskData.deal_c ? parseInt(taskData.deal_c) : null,
        type_c: taskData.type_c,
        status_c: taskData.status_c,
        notes_c: taskData.notes_c || ""
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Task updated successfully!");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("Failed to update task");
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Task deleted successfully!");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("Failed to delete task");
      }
      return false;
    }
  }

  async markComplete(id) {
    try {
      const updateData = {
        Id: parseInt(id),
        status_c: "Completed"
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        
        if (successfulUpdates.length > 0) {
          toast.success("Task marked as completed!");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error completing task:", error.message);
      toast.error("Failed to complete task");
      return false;
    }
  }
}

export default new TaskService();