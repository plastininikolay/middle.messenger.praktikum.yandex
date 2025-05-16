import { Indexed } from "../types";

function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  const result = { ...object };
  
  if (path.includes('.')) {
    const parts = path.split('.');
    let current = result;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      
      if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
        current[key] = {};
      }
      
      current = current[key] as Indexed;
    }
    
    current[parts[parts.length - 1]] = value;
  } else {
    result[path] = value;
  }
  
  return result;
}

export default set;