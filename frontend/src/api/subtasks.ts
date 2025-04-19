import axios from 'axios'

const API_BASE = '/api/subtasks'

export const createSubtask = async (title: string, parentId: number) => {
  const res = await axios.post(`${API_BASE}`, { title, taskId: parentId })
  return res.data
}

export const deleteSubtask = async (id: number) => {
  const res = await axios.delete(`${API_BASE}`, { data: { id } })
  return res.data
}
