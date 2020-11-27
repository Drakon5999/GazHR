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

export const submitDescription = async (text) => {
  const body = {
    text,
  };

  const [error, response] = await to(axios.post('submit_description', body))
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

// {
//   "job_name": строка,
//   "job_description": обрезанное описание
//   "job_id": число,
//   "scenario_id": привязанный сценарий, число
//   "candidates": [
//     {
//       "name": ФИО
//       "score": число
//       "candidate_id": число
//       "status": поле в котором можно хранить на каком сейчас этапе кандидат, для сценариев
//     }
//   ]
//
//   "test_files": [
//     {
//       "name": название файла
//       "test_file_url": url файла
//     }
//   ]
// }
