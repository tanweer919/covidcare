# Covid Care

Platform to search, share and request for covid related resources

## Setup

Before running the project you have to setup your environment.
For that create an **.env.local** file in the root of the project. The content of the file should be following:

```
NEXT_PUBLIC_DISCUSS_SHORT_NAME=Enter your disqus project short name
NEXT_PUBLIC_BASE_URL=Enter base url of the host #For development environment it will be http://localhost:3000
NEXT_PUBLIC_SERVER_BASE_URL=Enter base url of the api backend
```

## Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Create a production build

You can create a production build of the project by running following command:

```bash
npm run build
# or
yarn build
```

You can serve the production build locally by:

```bash
npm start
# or
yarn start
```
