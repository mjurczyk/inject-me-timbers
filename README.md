# 💀 Inject Me Timbers 💀

*Inject Me Timbers* is a typescript module for quick and simple dependency injection. Download, import, and inject to your heart's content.

# Requirements

Requires `typescript` and *experimentalDecorators*  to work nicely.

# How to use

## Components

Create components. Everything is a component. Components build the application, get injected, help other components, etc. Everything's a component. Use the `@Component` decorator to mark them in your code.

```ts
@Component()
export class WeatherComponent {
  private weather: string = 'unbelievably scurvy';

  whatIsTheWeather(): string {
    return this.weather;
  }
}
```

To use one component within another, inject them via the `constructor`!

```ts
@Component()
export class ShipComponent {
  constructor(
    private weatherComponent: WeatherComponent
  ) {}

  shouldWeSail(): boolean {
    return this.weatherComponent.whatIsTheWeather() !== 'unbelievably scurvy';
  }
}
```

## Modules

Now it is time to bundle everything up. Create a module. Modules wrap everything else into a single package. Simply use the `@Module` decorator, and list all components:

```ts
@Module({
  components: [
    ShipComponent,
    WeatherComponent
  ]
})
export class MyModule {}
```

*(TIP: You should not need that, but you can access all components in the module using `this.__components__` property of the module)*

# Do you need more?

Absolutely not.

# Testing

Run `npm test` to run unit tests. Like 4 of them.

# License

MIT :octocat:
