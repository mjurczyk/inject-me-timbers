import { resolveDependency } from '../../../src/decorators/module/module.decorator';
import { ModuleDependencyProvider } from '../../../src/types/module/module.types';
import { BaseComponentMock, InjectedComponentMock, ModuleMock } from './module.decorator.mocks';

describe('Module decorator', () => {
  let moduleMock: ModuleMock;
  
  beforeEach(() => {
    moduleMock = new ModuleMock();
  });

  it('should property inject dependencies within a module', () => {
    expect(moduleMock.baseComponent.hasInjectedDependency()).toBe(true);
  });

  it('should append resolved dependencies as __components__ in the module', () => {
    expect(moduleMock.__components__).toBeDefined();
  });

  describe('resolveDependency', () => {
    let providerMock: ModuleDependencyProvider;

    beforeEach(() => {
      providerMock = {};
    });

    it('should add resolved dependencies to the provider', () => {
      resolveDependency(BaseComponentMock, providerMock);

      expect((providerMock as any).InjectedComponentMock).toBeInstanceOf(InjectedComponentMock);
    });

    it('should not throw when component has no dependencies', () => {
      expect(function () {
        resolveDependency(InjectedComponentMock, providerMock);
      }).not.toThrow();
    });
  });
});
