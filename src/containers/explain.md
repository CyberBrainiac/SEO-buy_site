# Containers folder

Store higher-level components that encapsulate a specific feature, section, or page of your
application. These components are responsible for orchestrating the presentation and behavior of
other, lower-level components.

Containers frequently manage the state of the application. They can use React's built-in state
management (using useState or useReducer) or external state management libraries like Redux or Mobx
to manage the application's global or local state.

Containers often handle data fetching and manipulation. They may make API calls, interact with a
database. This data is then passed down as props to child components for rendering.
