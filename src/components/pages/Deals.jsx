import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import FormField from "@/components/molecules/FormField"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { dealService } from "@/services/api/dealService"
import { contactService } from "@/services/api/contactService"
import { toast } from "react-toastify"
const Deals = () => {
  const [deals, setDeals] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [filters, setFilters] = useState({
    dateRange: '',
    valueRange: '',
    contact: ''
  })

  const pipelineStages = [
    { name: "Lead", color: "bg-gray-500", textColor: "text-gray-700" },
    { name: "Qualified", color: "bg-info", textColor: "text-blue-700" },
    { name: "Proposal", color: "bg-warning", textColor: "text-yellow-700" },
    { name: "Negotiation", color: "bg-accent", textColor: "text-pink-700" },
    { name: "Closed Won", color: "bg-success", textColor: "text-green-700" },
    { name: "Closed Lost", color: "bg-error", textColor: "text-red-700" }
  ]

  const [newDeal, setNewDeal] = useState({
    Name: '',
    company_c: '',
    value_c: '',
    expected_close_date_c: '',
    stage_c: 'Lead',
    probability_percentage_c: 0
  })

  useEffect(() => {
    loadDeals()
    loadContacts()
  }, [])

  const loadDeals = async () => {
    try {
      setLoading(true)
      setError(null)
      const dealsData = await dealService.getAll()
      setDeals(dealsData)
    } catch (err) {
      setError(err.message)
      console.error('Error loading deals:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try {
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    } catch (err) {
      console.error('Error loading contacts:', err)
    }
  }

  const handleCreateDeal = async (e) => {
    e.preventDefault()
    try {
      await dealService.create(newDeal)
      toast.success('Deal created successfully')
      setShowCreateModal(false)
      setNewDeal({
        Name: '',
        company_c: '',
        value_c: '',
        expected_close_date_c: '',
        stage_c: 'Lead',
        probability_percentage_c: 0
      })
      loadDeals()
    } catch (err) {
      toast.error(`Error creating deal: ${err.message}`)
    }
  }

  const handleDragStart = (e, deal) => {
    e.dataTransfer.setData('dealId', deal.Id.toString())
  }

  const handleDrop = async (e, newStage) => {
    e.preventDefault()
    const dealId = e.dataTransfer.getData('dealId')
    
    try {
      await dealService.update(dealId, { 
        stage_c: newStage,
        last_activity_date_c: new Date().toISOString().split('T')[0]
      })
      toast.success('Deal stage updated')
      loadDeals()
    } catch (err) {
      toast.error(`Error updating deal: ${err.message}`)
    }
  }

  const handleDeleteDeal = async (dealId) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.delete(dealId)
        toast.success('Deal deleted successfully')
        loadDeals()
      } catch (err) {
        toast.error(`Error deleting deal: ${err.message}`)
      }
    }
  }

  const getFilteredDeals = () => {
    return deals.filter(deal => {
      let matchesFilters = true

      if (filters.valueRange) {
        const [min, max] = filters.valueRange.split('-').map(Number)
        const dealValue = deal.value_c || 0
        matchesFilters = matchesFilters && dealValue >= min && dealValue <= max
      }

      if (filters.contact) {
        matchesFilters = matchesFilters && deal.company_c?.Name?.toLowerCase().includes(filters.contact.toLowerCase())
      }

      if (filters.dateRange) {
        const today = new Date()
        const dealDate = new Date(deal.expected_close_date_c)
        
        switch (filters.dateRange) {
          case 'this-week':
            const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekStart.getDate() + 6)
            matchesFilters = matchesFilters && dealDate >= weekStart && dealDate <= weekEnd
            break
          case 'this-month':
            matchesFilters = matchesFilters && dealDate.getMonth() === today.getMonth() && dealDate.getFullYear() === today.getFullYear()
            break
          case 'this-quarter':
            const quarter = Math.floor(today.getMonth() / 3)
            const dealQuarter = Math.floor(dealDate.getMonth() / 3)
            matchesFilters = matchesFilters && dealQuarter === quarter && dealDate.getFullYear() === today.getFullYear()
            break
        }
      }

      return matchesFilters
    })
  }

  const getStageStats = (stageName) => {
    const stageDeals = getFilteredDeals().filter(deal => deal.stage_c === stageName)
    const count = stageDeals.length
    const totalValue = stageDeals.reduce((sum, deal) => sum + (deal.value_c || 0), 0)
    return { count, totalValue }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) return <Loading message="Loading deals..." />
  if (error) return <Error message={error} onRetry={loadDeals} />

  const filteredDeals = getFilteredDeals()
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deals</h1>
          <p className="text-gray-600">Track your sales opportunities and pipeline progress.</p>
        </div>
<Button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>New Deal</span>
        </Button>
      </motion.div>

{/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField 
                label="Date Range"
                type="select"
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              >
                <option value="">All Time</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="this-quarter">This Quarter</option>
              </FormField>
              
              <FormField 
                label="Deal Value Range"
                type="select"
                value={filters.valueRange}
                onChange={(e) => setFilters(prev => ({ ...prev, valueRange: e.target.value }))}
              >
                <option value="">All Values</option>
                <option value="0-10000">$0 - $10,000</option>
                <option value="10000-50000">$10,000 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000-999999">$100,000+</option>
              </FormField>
              
              <FormField 
                label="Company"
                type="input"
                placeholder="Search by company..."
                value={filters.contact}
                onChange={(e) => setFilters(prev => ({ ...prev, contact: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto pb-6"
      >
        <div className="flex space-x-6 min-w-max">
          {pipelineStages.map((stage, index) => {
            const stats = getStageStats(stage.name)
            const stageDeals = filteredDeals.filter(deal => deal.stage_c === stage.name)
            
            return (
              <div
                key={stage.name}
                className="w-80 bg-gray-50 rounded-lg p-4"
                onDrop={(e) => handleDrop(e, stage.name)}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${stage.color} rounded-full`} />
                      <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    </div>
                    <Badge variant="secondary" className={`${stage.textColor}`}>
                      {stats.count}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {formatCurrency(stats.totalValue)}
                  </p>
                </div>

                {/* Deal Cards */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ApperIcon name="Package" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No deals in this stage</p>
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <motion.div
                        key={deal.Id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal)}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">
                            {deal.Name}
                          </h4>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setSelectedDeal(deal)
                                setShowDetailModal(true)
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ApperIcon name="Eye" size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteDeal(deal.Id)}
                              className="p-1 hover:bg-gray-100 rounded text-error"
                            >
                              <ApperIcon name="Trash2" size={14} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-primary">
                              {formatCurrency(deal.value_c)}
                            </span>
                            <span className="text-gray-500">
                              {deal.probability_percentage_c}%
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Building" size={12} />
                            <span className="truncate">
                              {deal.company_c?.Name || 'No company'}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Calendar" size={12} />
                            <span>{formatDate(deal.expected_close_date_c)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Clock" size={12} />
                            <span>{formatDate(deal.last_activity_date_c)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Create Deal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Deal</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateDeal} className="space-y-4">
              <FormField
                label="Deal Name"
                type="input"
                required
                value={newDeal.Name}
                onChange={(e) => setNewDeal(prev => ({ ...prev, Name: e.target.value }))}
                placeholder="Enter deal name"
              />
              
              <FormField
                label="Company"
                type="select"
                required
                value={newDeal.company_c}
                onChange={(e) => setNewDeal(prev => ({ ...prev, company_c: e.target.value }))}
              >
                <option value="">Select a company</option>
                {contacts.map(contact => (
                  <option key={contact.Id} value={contact.Id}>
                    {contact.company_c || contact.Name}
                  </option>
                ))}
              </FormField>
              
              <FormField
                label="Deal Value"
                type="input"
                inputType="number"
                required
                value={newDeal.value_c}
                onChange={(e) => setNewDeal(prev => ({ ...prev, value_c: e.target.value }))}
                placeholder="0.00"
              />
              
              <FormField
                label="Expected Close Date"
                type="input"
                inputType="date"
                required
                value={newDeal.expected_close_date_c}
                onChange={(e) => setNewDeal(prev => ({ ...prev, expected_close_date_c: e.target.value }))}
              />
              
              <FormField
                label="Pipeline Stage"
                type="select"
                value={newDeal.stage_c}
                onChange={(e) => setNewDeal(prev => ({ ...prev, stage_c: e.target.value }))}
              >
                {pipelineStages.map(stage => (
                  <option key={stage.name} value={stage.name}>
                    {stage.name}
                  </option>
                ))}
              </FormField>
              
              <FormField
                label="Probability %"
                type="input"
                inputType="number"
                min="0"
                max="100"
                value={newDeal.probability_percentage_c}
                onChange={(e) => setNewDeal(prev => ({ ...prev, probability_percentage_c: e.target.value }))}
                placeholder="0"
              />
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  Create Deal
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Deal Detail Modal */}
      {showDetailModal && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-lg mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Deal Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Deal Name</label>
                <p className="mt-1 text-gray-900">{selectedDeal.Name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Company</label>
                <p className="mt-1 text-gray-900">{selectedDeal.company_c?.Name || 'No company'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Value</label>
                  <p className="mt-1 text-gray-900 font-semibold">{formatCurrency(selectedDeal.value_c)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Probability</label>
                  <p className="mt-1 text-gray-900">{selectedDeal.probability_percentage_c}%</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Stage</label>
                <div className="mt-1">
                  <Badge variant="secondary" className="capitalize">
                    {selectedDeal.stage_c}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Expected Close Date</label>
                  <p className="mt-1 text-gray-900">{formatDate(selectedDeal.expected_close_date_c)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Activity</label>
                  <p className="mt-1 text-gray-900">{formatDate(selectedDeal.last_activity_date_c)}</p>
                </div>
              </div>
              
              {selectedDeal.CreatedOn && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="mt-1 text-gray-600 text-sm">{formatDate(selectedDeal.CreatedOn)}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button 
                onClick={() => setShowDetailModal(false)}
                variant="outline" 
                className="w-full"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
</div>
  )
}

export default Deals