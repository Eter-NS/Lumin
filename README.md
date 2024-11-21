# Lumin

Lumin is a free, open source, and community-driven project that aims to provide an easy way for chatting with LLMs, both open-source and via OpenAI's like API.

Write, discuss, and learn with your tools!

## Getting started with Lumin (Installation)

To start using Lumin, please make sure to have installed `Node.js` in version `20.0.0` or higher as well as `Python 3 (3.11+ recommended)`, the rest really easy!

1. Install Lumin's frontend dependencies by running `npm install`.
2. Run `npm run build` to build the frontend.
3. Move to the `backend` directory and create a virtual python environment by `python -m venv venv` and activate it based on what system do you use:
   - `source venv/bin/activate` on Linux/Mac OS
   - `venv\Scripts\activate.bat` or `venv\Scripts\Activate.ps1` on Windows
4. Install Lumin's backend dependencies by running `pip install -r requirements.txt`.
5. Start the application by running a script based on your system:
   - `bash start` on Linux/Mac OS
   - `start-windows.bat` on Windows
6. Open your browser at [http://localhost:4200](http://localhost:4200) to see the application running!

## Nx plugins and code generators

Add Nx plugins to leverage their code generators and automated, inferred tasks.

```
# Add plugin
npx nx add @nx/angular

# Use code generator
npx nx generate @nx/angular:application demo

# Run development server
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the docs.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).
