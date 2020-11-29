import axios from '../axios';
import to from 'await-to-js';

export const generateText = async (text) => {
  const body = {
    text,
  };

  const [error, response] = await to(axios.post('generate_description', body))
  if (error || !response) throw error;
  return response.data;
}

export const submitDescription = async (name, text) => {
  const body = {
    name,
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
    job_id: parseInt(jobId),
  };

  const [error, response] = await to(axios.post('get_job_full_info', body))
  if (error || !response) throw error;
  return response.data;
}

export const removeJob = async (jobId) => {
  const body = {
    job_id: parseInt(jobId),
  };

  const [error, response] = await to(axios.post('delete_vacancy', body))
  if (error || !response) throw error;
  return response.data;
}

export const getScripts = async () => {
  const [error, response] = await to(axios.post('get_all_scenarios'))
  if (error || !response) throw error;
  return response.data;
}

export const getCandidates = async () => {
  const [error, response] = await to(axios.post('get_all_candidates'))
  if (error || !response) throw error;
  return response.data;
}

export const getScript = async (scriptId) => {
  const body = {scenario_id: parseInt(scriptId)};
  const [error, response] = await to(axios.post('get_scenario', body))
  if (error || !response) throw error;
  return response.data;
}

export const setScript = async (name, data) => {
  const body = {
    name,
    json_scenario: data,
  }
  const [error, response] = await to(axios.post('create_scenario', body))
  if (error || !response) throw error;
  return response.data;
}

export const goToNextStep = async (candidateId) => {
  const body = {
    candidate_id: parseInt(candidateId),
  }
  const [error, response] = await to(axios.post('update_scenario_step', body))
  if (error || !response) throw error;
  return response.data;
}

export const denyCandidate = async (vacancyId, candidateId) => {
  const body = {
    resume_id: parseInt(candidateId),
    vacancy_id: parseInt(vacancyId),
  }
  const [error, response] = await to(axios.post('remove_vacancy2resume', body))
  if (error || !response) throw error;
  return response.data;
}

export const goToOtherJob = async (candidateId) => {
  const body = {
    resume_id: parseInt(candidateId),
    vacancy_id: parseInt(candidateId),
  }

  const [error, response] = await to(axios.post('update_scenario_step', body))
  if (error || !response) throw error;
  return response.data;
}

export const bindScriptToVacancy = async (jobId, scriptId) => {
  const body = {
    job_id: parseInt(jobId),
    scenario_id: parseInt(scriptId),
  }
  const [error, response] = await to(axios.post('job_edit', body))
  if (error || !response) throw error;
  return response.data;
}

export const getCandidate = async (candidateId) => {
  const body = {
    candidate_id: parseInt(candidateId),
  }
  const [error, response] = await to(axios.post('candidate_info', body))
  if (error || !response) throw error;
  return response.data;
}

export const checkResume = async (vacancyId, resumeId) => {
  const body = {
    vacancy_id: parseInt(vacancyId),
    resume_id: parseInt(resumeId),
  }

  const [error, response] = await to(axios.post('check', body))
  if (error || !response) throw error;
  return response.data;
}
