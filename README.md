# JSTesting

Learn how to write JS tests.

### Different types of tests

***Unit testing*** tests individual units (modules, functions, classes) in issolation from the rest of the program. ***Integration testing*** tests integrations between two or more units. ***Functional testing*** tests the application from the point of view of the user; functional testing is a subset of integration testing.

***Black box testing*** focuses in tests the public interface of the unit, while ***white box testing*** focuses in thest the implementation of the unit. 

### Code coverage and case coverage

***Code coverage*** referes to the amount of code covered by test cases. ***Case coverage*** refers to how many of the uses-cases are covered by the tests suits.

***Unit testing*** by definition tests units in isolation, meaning that a test suit containing only unit tests will be close to 0% for case coverage scenarios.

### Unit coupling

The need to mock in order to achieve unit isolation for the purpose of a unit tests is caused by coupling between units. ***Less coupling*** makes code easier to extend and maintain, and also makes easier to test units.

***Coupling*** is the degree to which a unit of code depends upon other units of code. Coupling can take different forms:

- ***Subclass coupling***, subclasses depends on the entire implementation of the parent class.
- ***Controll dependency***, code that controls its dependencies by telling them what to do.
- ***Mutable state dependency***, code that shares mutable state with other code.
- ***State shape dependency***, code that shares data structures with other code.
- ***Event message coupling***, code that communicates with other units via messages.

***High coupling*** is caused by:

- Mutation vs immutability
- Responsability overload vs Do One Thing
- Procedural instructions vs describing structure
- Class inheritance vs composition

Imperative and object-oriented code is more susceptible to high coupling than ***functional programming***. Functional programming uses pure functions as the elemental unit of composition.

Pure functions, given the same input always return the same output, and produce no-side effects.

---

1. [Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) by Eric Elliott
