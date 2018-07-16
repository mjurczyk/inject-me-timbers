import { Component } from 'decorators/component/component.decorator';
import { Module } from 'decorators/module/module.decorator';

@Component()
export class InjectedComponentMock {}

@Component()
export class BaseComponentMock {
  constructor(
    private injectedComponentMock: InjectedComponentMock
  ) {}

  public hasInjectedDependency(): boolean {
    return this.injectedComponentMock instanceof InjectedComponentMock;
  }
}

@Module({
  components: [
    BaseComponentMock,
    InjectedComponentMock
  ]
})
export class ModuleMock {
  public __components__;

  get baseComponent() {
    return this.__components__.BaseComponentMock;
  }
};
