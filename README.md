# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a6995919-027c-4a37-b942-8cfed92fa987

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a6995919-027c-4a37-b942-8cfed92fa987) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend/database)

## Supabase Integration

This project uses Supabase to store form submission data. The integration works as follows:

1. User fills out the multi-step form (personal details, fitness goals, etc.)
2. Data is temporarily stored in localStorage as the user progresses through the form
3. When the user reaches the plan selection page and selects a plan, the data is saved to Supabase:
   - Complete form data is stored in the `form_submissions` table
   - The selected plan type (workout, meal, or combined) is recorded
   - Payment status is tracked

### Data Storage Flow

- **Initial form submission**: Basic form data is saved to Supabase when the user first submits the form
- **Plan selection**: When a user selects and pays for a plan, complete form data including plan selection is saved to Supabase
- **Webhook integration**: After saving data to Supabase, the selected webhooks are triggered to generate the appropriate plan(s)

### Supabase Tables

- `form_submissions`: Stores complete form data in JSON format, along with user details and submission metadata

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a6995919-027c-4a37-b942-8cfed92fa987) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
