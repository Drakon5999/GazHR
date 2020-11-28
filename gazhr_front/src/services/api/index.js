import axios from '../axios';
import to from 'await-to-js';

export const generateText = async (text) => {
  const body = {
    text,
  };

  const [error, response] = await to(axios.post('generate_description', body))
  console.log(error, response)
  if (error || !response) throw error;
  return response.data;
}

export const submitDescription = async (text) => {
  const body = {
    text,
  };

  const [error, response] = await to(axios.post('submit_description', body))
  if (error || !response) throw error;
  return response.data;
}

export const getJobsList = async (jobId) => {
  const body = {
    job_id: jobId,
  };

  const [error, response] = await to(axios.get('get_jobs_list', body))

  if (error || !response) throw error;
  return response.data;
}

export const getJobFullInfo = async (jobId) => {
  const body = {
    job_id: jobId,
  };

  const [error, response] = await to(axios.post('job_full_info', body))
  if (error || !response) throw error;
  return response.data;
}

export const removeJob = async (jobId) => {
  const body = {
    job_id: jobId,
  };

  const [error, response] = await to(axios.post('job_remove', body))
  if (error || !response) throw error;
  return response.data;
}
