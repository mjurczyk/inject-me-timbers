import 'reflect-metadata';
import { ModuleComponentType } from 'types/module/module.types';

export type ComponentConstructor = (ModuleComponentType) => ModuleComponentType;

export function Component(): ComponentConstructor {
  return ((component: ModuleComponentType) => component);
}
