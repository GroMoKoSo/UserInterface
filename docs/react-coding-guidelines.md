# React Coding Guidelines

This document outlines the coding guidelines for React development in our project. Adhering to these guidelines will help maintain code quality, readability, and consistency across the codebase.

## Folder Structure

- Inside `/src` there are four main folders: `/components`, `/pages`, `/types`, and `/utils`.
    - `/components` contains reusable React components. Every component should have its own folder with the component file, styles, and tests.
    - `/pages` contains page-level components that correspond to routes in the application.
        - There are four subfolders in `/pages`:
            - `/Api` for api-related pages.
            - `/User` for user-related pages.
            - `/Group` for group-related pages.
            - `/Common` for pages that are shared across different user roles. (e.g., login, dashboard)
        - Each subfolder contains components specific to that feature or section of the application.
        - Each page component should also have its own folder with the component file, styles, and tests.
        - Each page component should have the `.page.tsx` suffix to distinguish it from regular components.
    - `/types` contains TypeScript type definitions and interfaces.
    - `/utils` contains utility functions and helpers.

## Naming

- Use PascalCase for component names (e.g., `UserProfile`).
- Use descriptive names that convey the purpose of the component.

## Components
Components can be one of three types and should be named with the appropriate suffix:

- **Presentational components:** 
  - Focus on how things look. 
  - They receive data and callbacks exclusively via props. 
  - Presentational components can render other components.
  - Suffix: `.view.tsx`

- **Container components:** 
  - Focus on how things work. 
  - They manage state, hooks and pass data down to presentational components. 
  - Container components are allowed to render other components (both presentational and container)
  - Suffix: `.container.tsx`

- **Page components:** 
  - Represent a full page and are typically associated with a route.
  - Suffix: `.page.tsx`
 
## Props and State

- Use functional components and hooks for state management.
- Keep component state to a minimum; derive state from props whenever possible.
- **Null Handling in Presentational Components:**  
  - All presentational components must check for `null` or `undefined` data in the first lines of the component.
  - If the required data is `null` or loading, render the `<MyLoader />` component instead of the usual content.
  - Example:
    ```tsx
    const UserProfileView = ({ user }: { user: User | null }) => {
      if (!user) return <MyLoader />;
      // ...rest of the component
    };
    ```

## Styling

- Use CSS Modules or styled-components for component-level styles.
- Avoid global styles; use them sparingly and with caution.

## Imports

- Use absolute imports for better readability (e.g., `import Button from 'components/Button'`).
- Group imports by external libraries, internal components, and styles (in that order).

## Testing

- Write unit tests for all components using vitest.
- Aim for high test coverage, especially for critical components.

## Performance

- Optimize component rendering using React.memo and useCallback.
- Avoid unnecessary re-renders by lifting state up when needed.

## Documentation

- Document all components using JSDoc or similar tools.
- Include usage examples and prop descriptions in the documentation.
