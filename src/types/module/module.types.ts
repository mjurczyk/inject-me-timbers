export type AbstractClassType = { new(...args: any[]): any; };
export type ModuleComponentType = AbstractClassType;
export type ModuleType = { new(...args: any[]): any; __components__: any[]; };
export type ModuleDependencyProvider = object;
export type ModuleArgs = { components?: ModuleComponentType[] };
export type ModuleConstructor = (ModuleType) => ModuleType;
