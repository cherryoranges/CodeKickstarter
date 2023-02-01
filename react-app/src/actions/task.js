import ENV from '../config.js'
import { PATCH } from './http.js';
const API_HOST = ENV.api_host

export const patchTask = (projectId, featureId, taskId, task) => {
    const url = `${API_HOST}/api/projects/${projectId}/features/${featureId}/tasks/${taskId}`;
    return PATCH(url, task)
}