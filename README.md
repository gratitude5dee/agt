# Agents Got Talent (AGT)

<p align="center">
  <img src="https://raw.githubusercontent.com/mrgigabyte/agt-readme-assets/main/agt-logo-banner.png" alt="Agents Got Talent Banner" />
</p>

<p align="center">
  <strong>Where AI meets A&R. Get your music analyzed by an AI judge and mint your IP on-chain.</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/github/workflow/status/mrgigabyte/agt-readme-assets/CI/main?style=for-the-badge&logo=githubactions&logoColor=white" alt="Build Status"></a>
  <a href="#"><img src="https://img.shields.io/github/package-json/v/mrgigabyte/agt-readme-assets?style=for-the-badge" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/github/license/mrgigabyte/agt-readme-assets?style=for-the-badge" alt="License"></a>
  <a href="https://twitter.com/OnchainKit"><img src="https://img.shields.io/twitter/follow/OnchainKit?style=for-the-badge&logo=x" alt="Follow on X"></a>
</p>

## Overview

**Agents Got Talent (AGT)** is a revolutionary platform that empowers musicians and creators by providing AI-driven feedback on their work. Upload your song and our AI music expert, **Vibezmaster**, will generate a detailed A&R report. If the song has potential, you can instantly mint the track and its analysis as an on-chain Intellectual Property (IP) asset using Story Protocol concepts.

This project serves as a cutting-edge template for building full-stack, on-chain applications with AI integration, featuring a seamless user experience from wallet connection to transaction completion.

<p align="center">
  <img src="https://raw.githubusercontent.com/mrgigabyte/agt-readme-assets/main/agt-demo.gif" alt="AGT Application Demo" width="800"/>
</p>

## ✨ Features

*   **🎙️ AI Music Analysis**: Upload your track and receive a comprehensive "Vibez Report" powered by Google's Gemini Pro model, evaluating everything from melody to commercial potential.
*   **🔐 Web3 Authentication**: Secure and simple login using **Sign-In with Ethereum (SIWE)**.
*   **💎 On-Chain IP Minting**: Mint your song and its unique AI analysis as an NFT on the Base Sepolia testnet.
*   **🚀 Modern Frontend**: A sleek, responsive, and highly stylized UI built with **Vite, React, TypeScript, and Shadcn UI**.
*   **🔗 Seamless Wallet Integration**: Effortless wallet connection and transaction management powered by **RainbowKit** and **Coinbase OnchainKit**.
*   **⚡ Serverless Backend**: Robust backend logic powered by **Supabase Edge Functions** (Deno), handling authentication, AI processing, and secure transaction recording.
*   **🔒 Secure & Verified**: All on-chain actions are validated by the backend before being recorded, ensuring data integrity.
*   **🧪 Ready for Production**: A complete template with testing (`Vitest`), linting (`ESLint`, `Biome`), and a clear, scalable architecture.

## 🛠️ Tech Stack

| Category         | Technology                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **Frontend**     | [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)       |
| **UI Components**| [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/) |
| **Routing**      | [React Router](https://reactrouter.com/)                                                                    |
| **Web3**         | [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), [RainbowKit](https://www.rainbowkit.com/), [OnchainKit](https://onchainkit.xyz/) |
| **Backend**      | [Supabase](https://supabase.com/) (Auth, Database, Edge Functions)                                          |
| **Edge Runtime** | [Deno](https://deno.land/)                                                                                  |
| **AI**           | [Google Gemini Pro](https://ai.google.dev/)                                                                 |
| **Testing**      | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/introduction/) |
| **Tooling**      | [Bun](https://bun.sh/), [ESLint](https://eslint.org/), [Biome](https://biomejs.dev/)                         |

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or higher)
*   [Bun](https://bun.sh/) (or `npm`/`yarn`)
*   [Supabase Account](https://supabase.com/) & [Supabase CLI](https://supabase.com/docs/guides/cli)
*   [Google AI Studio API Key](https://ai.google.dev/) for Gemini
*   [WalletConnect Cloud Project ID](https://cloud.walletconnect.com/)
*   An Alchemy or Infura account for a RPC URL.

### 1. Clone the Repository

```bash
git clone https://github.com/mrgigabyte/agt-main.git
cd agt-main
```

### 2. Install Dependencies

This project uses Bun for package management.

```bash
bun install
```
*Alternatively, you can use npm or yarn:*
```bash
# With npm
npm install

# With yarn
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, fill in the required values:

```env
# .env

# Frontend Variables
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_WC_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
VITE_CDP_API_KEY="YOUR_COINBASE_CDP_API_KEY" # Optional, for OnchainKit

# Backend (Supabase Edge Function) Variables
# These will be set in the Supabase Dashboard, not here.
# SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
# GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
# ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY" # or BLOCKCHAIN_RPC_URL
```
*   You can get `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's API settings.

### 4. Set Up Supabase Backend

This is the most critical step. Ensure you have the Supabase CLI installed and logged in.

**a. Link Your Project**

In your terminal, link your local project to your Supabase project:
```bash
supabase link --project-ref YOUR_PROJECT_ID
```
*You can find `YOUR_PROJECT_ID` in your Supabase project's URL (`https://supabase.com/dashboard/project/YOUR_PROJECT_ID`).*

**b. Create Database Tables**

Execute the following SQL queries in the Supabase SQL Editor to create the necessary tables.

Go to `Database` -> `SQL Editor` -> `+ New query` and run this:

```sql
-- Create profiles table to store user data
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  username text NULL,
  wallet_address text NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_username_key UNIQUE (username),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create mint_records table to track NFT mints
CREATE TABLE public.mint_records (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NULL,
  transaction_hash text NOT NULL,
  contract_address text NOT NULL,
  token_id text NULL,
  CONSTRAINT mint_records_pkey PRIMARY KEY (id),
  CONSTRAINT mint_records_transaction_hash_key UNIQUE (transaction_hash),
  CONSTRAINT mint_records_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL
);
ALTER TABLE public.mint_records ENABLE ROW LEVEL SECURITY;

-- Add policies for RLS
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own mint records." ON public.mint_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own mint records." ON public.mint_records FOR INSERT WITH CHECK (auth.uid() = user_id);
```

**c. Set Backend Environment Variables**

The Edge Functions need their own environment variables. Run these commands in your terminal:
```bash
# Get your Service Role Key from Project Settings > API
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"

# Your Google AI Studio API Key
supabase secrets set GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Your RPC URL for Base Sepolia (e.g., from Alchemy)
# The `record-mint` function will use this.
supabase secrets set ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
# Or set the full RPC URL directly
# supabase secrets set BLOCKCHAIN_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_KEY"
```

**d. Deploy Edge Functions**

Deploy all functions to your Supabase project:
```bash
supabase functions deploy
```
*This command deploys all functions found in the `supabase/functions` directory.*

### 5. Run the Application

Now you're ready to start the development server.

```bash
bun run dev
```
The application should now be running on `http://localhost:8080`.

## 🤖 Usage

1.  **Navigate** to the `http://localhost:8080/studio`.
2.  **Connect Your Wallet**: Use the "Connect Wallet" button to connect your preferred wallet. The app is configured for the **Base Sepolia** testnet.
3.  **Upload a Song**: Drag and drop or browse to upload an audio file (`.mp3`, `.wav`, etc.).
4.  **Generate Vibez Report**: The app will automatically send the song to the **Vibezmaster** AI. Wait for the analysis to complete.
5.  **Review the Report**: Examine the scores, executive summary, strengths, and weaknesses.
6.  **Mint Your IP**: If you're happy with the report, click "Yes, mint my IP". This will trigger the next step.
7.  **Generate Music Video (Simulated)**: The app simulates the creation of a music video.
8.  **Confirm the Transaction**: A transaction will be prompted in your wallet to mint the NFT. Confirm it.
9.  **Success!**: Once the transaction is confirmed on-chain, your IP is officially minted!

## 🧪 Testing

This project uses Vitest for unit and integration testing.

To run all tests:
```bash
bun test
```

To run tests with UI and coverage reports:
```bash
bun test --ui
bun test --coverage
```

## 🤝 Contributing

Contributions are welcome! We're excited to see what the community builds on top of AGT. Please follow these steps to contribute:

1.  **Fork the repository.**
2.  **Create a new branch** (`git checkout -b feature/your-feature-name`).
3.  **Make your changes.**
4.  **Commit your changes** (`git commit -m 'feat: Add some amazing feature'`).
5.  **Push to the branch** (`git push origin feature/your-feature-name`).
6.  **Open a Pull Request.**

Please ensure your code adheres to the existing linting and formatting rules.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 🙏 Acknowledgments

*   **Shadcn UI**: For the incredible UI components and design system.
*   **OnchainKit**: For simplifying Web3 development with amazing wallet and transaction components.
*   **Supabase**: For providing a powerful and easy-to-use backend-as-a-service.
*   **Google AI**: For the powerful Gemini model that makes Vibezmaster possible.
*   **Wagmi & Viem**: For their robust and type-safe tools for Ethereum interaction.
*   **Lovable**: For the initial project scaffolding.
