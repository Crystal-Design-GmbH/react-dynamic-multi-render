# React Dynamic Multi Render

Dynamically render a different version of a component based on a central configuration object.
Makes advanced theming and templating for multi-client applications very easy and scalable.

Only loads the neccesary components using lazy loading and intelligent prefetching.

## Setup

First of all, create a new folder inside your `components` folder where all your dynamic render components are going to live. In this case, let's call it `template`.

Next, in your application entry file, you need to setup a few things:

```typescript
import {
  DynamicMultiRenderProvider,
  DynamicMultiRenderConfig,
} from 'react-dynamic-multi-render';
import React, { Suspense, useEffect, useState } from 'react';
// Your custom Loading component
import Loading from '../Loading';
// A dynamic render compoennt
import ImportantComponent from '../template/ImportantComponent';

interface Props {}

const dynamicMultiRenderConfig: DynamicMultiRenderConfig = {
  templateConfig: {
    NextButton: 'standard',
    Settings: ['standard', { preload: false }],
  },
  importFactory: (path) => import(`../template/${path}`),
};

const App = ({}: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicMultiRenderProvider value={dynamicMultiRenderConfig}>
        <ImportantComponent />
      </DynamicMultiRenderProvider>
    </Suspense>
  );
};

export default App;
```

You need to do two things:

- Wrap your app inside the `DynamicMultiRenderProvider` component
- Pass the Provider a configuration object.

Now let's talk about the more interesting part: The configuration.

## Configuration

The configuration object currently accepts two properties:

- templateConfig
- importFactory

In the `templateConfig` object, you can specify which version of a component will be rendered.
To do so, just pass the name of the component version (Example 1). The name equals the name of the folder (we will talk about that later under anatomy of a component).
Instead of passing the name directly, you can also specify an array with a configuration object to set some additional parameters (Example 2).

```typescript
const dynamicMultiRenderConfig: DynamicMultiRenderConfig = {
  templateConfig: {
    NextButton: 'standard', // Example 1
    Settings: ['extended', { preload: false }], // Example 2
  },
  // ...
};
```

Althoug `standard` is the default version which will be loaded if it isn't present in this object, it is better to include every component, because every component which is included in this object will automatically be preloaded as soon as the app starts.
To disable that behaviour, set `{ preload: false }`.

For the `importFactory` function, you need to define a dynamic import which resolves and loads the actual components. This function needs to return a dynamic import which starts with a relative path. This is needed so that webpack knows what chunks it needs to prepare. It accepts `path` as it's first parameter, which is essentially the relative path of the component to load inside the folder.
If, like in our case, the folder's name is `template`, that function would like the following:

```typescript
const dynamicMultiRenderConfig: DynamicMultiRenderConfig = {
  // ...
  importFactory: (path) => import(`../template/${path}`),
};
```

This will create a lazy-loadable chunk for every resolvable file inside the `template` folder.

## Anatonomy of a multi render component

Multi render components need to implement a strict structure and should follow a few guidelines.

First of all, there's some boilerplate code to implement.

When create a multi render component, first of all create a folder with the component's name and an `index.tsx` file inside it, e.g.

```
CheckoutButton
│   index.tsx
```

Inside that file, add the following boilerplate:

```typescript
// index.tsx
import DynamicMultiRender from 'react-dynamic-multi-render';
import React from 'react';

export interface CheckoutButtonProps {
  onClick: () => void;
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  return <DynamicMultiRender {...props} componentName="CheckoutButton" />;
};

export default CheckoutButton;
```

Next, create the standard implementation of your component.

```
CheckoutButton
│   index.tsx
│
└───standard
        index.module.css (optional)
        index.tsx
```

```typescript
// standard/index.tsx
import React from 'react';
import classnames from 'classnames';
import { CheckoutButtonProps } from '..';

import { checkoutBtn } from './index.module.css';

interface Props extends CheckoutButtonProps {
  className?: string;
}

const CheckoutButtonStandard = ({
  className,
  onClick,
}: CheckoutButtonProps) => {
  return (
    <button onClick={onClick} className={classnames(checkoutBtn, className)}>
      Checkout
    </button>
  );
};

export default CheckoutButtonStandard;
```

This is the `standard` version of the component which will be loaded. Note that the type definition of it's properties extends the base properties under the `index.tsx` file at the root of the component.

You could see the properties defined in that `index.tsx` file as the public properties which every component version needs to support.

We add the property `className` under `standard/index.tsx` so that it can be customized by other component versions, so we don't need to re-implement all of it. This leads us to the next part: implementing a different version. Let's say the new component version we want to implement is called `extendend`, as it's an extended version of the original (standard) component:

```
CheckoutButton
│   index.tsx
│
├───extended
│       index.module.css
│       index.tsx
│
└───standard
        index.module.css
        index.tsx
```

```typescript
// extended/index.tsx
import React from 'react';
import { CheckoutButtonProps } from '..';
import CheckoutButtonStandard from '../standard';

import { nextBtnExtended } from './index.module.css';

const CheckoutButtonExtended = (props: CheckoutButtonProps) => {
  return <CheckoutButtonStandard {...props} className={nextBtnExtended} />;
};

export default CheckoutButtonExtended;
```

Thanks to the fact that the `CheckoutButtonStandard` component accepts a `className` property, we can override it's style using a custom class called `nextBtnExtended` we defined in a CSS module.

Now, if in our `templateConfig` the property `CheckoutButton` is set to `extended` this component will be rendered.

## A note on loading indicators

Every multi render component must at some level be a descendant of a React `Suspense` component.
With that, you can define custom fallback loading components. The very least you need to provide is a `Suspense` component which wraps your whole application.

It is advised to not display the loading component immediately, but only after a certain small amount of time, to avoid flickering for fast connections. This could be implemented like this:

```typescript
import React, { useEffect, useState } from 'react';
import { loader as loaderClass } from './index.module.css';
import loader from './loading.svg';

interface Props {}

const DELAY = 250;

/**
 * Only shows up after 250ms
 * to prevent a flash
 */
const Loading = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;

    window.setTimeout(() => {
      if (!didCancel) setShow(true);
    }, DELAY);

    return () => {
      didCancel = true;
    };
  }, [DELAY]);

  if (!show) return <></>;

  return (
    <div className={loaderClass}>
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Loading;
```
