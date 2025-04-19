import axios from 'axios'

const API_BASE = '/api/subtasks'

export const createSubtask = async (title: string, parentId: number) => {
  const res = await axios.post(`${API_BASE}/${parentId}`, { title })
  return res.data
}

export const deleteSubtask = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/${id}`)
  return res.data
}