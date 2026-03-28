import json from './todos.json' with { type: 'json' };

export const todos = structuredClone(json);