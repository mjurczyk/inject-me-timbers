import 'reflect-metadata';
import {
  ModuleComponentType,
  ModuleType,
  ModuleDependencyProvider,
  ModuleArgs,
  ModuleConstructor
} from 'types/module/module.types';

export function resolveDependency(targetDef: ModuleComponentType, providerRef: ModuleDependencyProvider): void {
  const constructorDef = targetDef && targetDef.prototype ? targetDef.prototype.constructor : undefined;

  if (!constructorDef) {
    return;
  }

  const dependencyMetadata = [].concat(Reflect.getMetadata('design:paramtypes', constructorDef))
    .filter(Boolean)
    .map((dependencyDef: ModuleComponentType) => dependencyDef);
  const constructorArgs = [];

  dependencyMetadata.forEach((type) => {
    if (!providerRef.hasOwnProperty(type.name)) {
      resolveDependency(type, providerRef);
    }
    
    constructorArgs.push(providerRef[type.name]);
  });

  providerRef[targetDef.name] = new targetDef(...constructorArgs);
}

export function Module(args?: ModuleArgs): ModuleConstructor {
  const dependencyProvider: ModuleDependencyProvider = {};

  if (args.components && args.components.length) {
    args.components.forEach((componentDef: ModuleComponentType) => resolveDependency(componentDef, dependencyProvider));
  }

  return ((module: ModuleType) => {
    module.prototype.__components__ = dependencyProvider;

    return module;
  });
}
