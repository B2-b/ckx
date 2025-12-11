import axios from 'axios';
import { config } from '../config';

const api = axios.create({
    baseURL: config.n8nBaseUrl,
});

export const ingestFile = async (file: File, type: 'quick_scan' | 'library_book' | 'knowledge_clip', metadata?: any) => {
    const formData = new FormData();
    formData.append('data', file);
    formData.append('type', type);
    if (metadata) {
        formData.append('metadata', JSON.stringify(metadata));
    }

    // Note: The webhook path is 'ingest' as defined in WF1
    const response = await api.post('/webhook/ingest', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const ingestIndex = async (file: File, bookId: string) => {
    const formData = new FormData();
    formData.append('data', file);
    formData.append('bookId', bookId);

    const response = await api.post('/webhook/ingest_index', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const saveItem = async (data: any, type: 'recipe' | 'knowledge_clip') => {
    const response = await api.post('/webhook/save_item', {
        ...data,
        type,
    });
    return response.data;
};

export const chatWithSousChef = async (query: string, history: any[]) => {
    const response = await api.post('/webhook/chat', {
        chatInput: query,
        history, // Optional, if the workflow supports history
    });
    return response.data;
};
