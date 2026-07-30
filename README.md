# ⚡ Solana Web3 dApp Boilerplate

![Solana](https://img.shields.io/badge/Solana-145653?style=for-the-badge&logo=solana&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)

A modular, production-ready **Web3 dApp Boilerplate** built on **Next.js 14 (App Router)** with integrated **Solana Wallet Adapter** (`@solana/wallet-adapter-react`), Devnet SOL Airdrops, live account streaming, and cryptographic message signing.

---

## ✨ Features

- **🛡️ Multi-Wallet Support**: Seamless auto-discovery and integration for Phantom, Solflare, and Solana Wallet Standard extension wallets.
- **⚡ Live Account State**: Dynamic real-time SOL balance tracker using WebSocket subscriptions (`onAccountChange`).
- **🪂 Devnet Airdrop Helper**: Single-click 1 SOL Devnet test token requests directly to the connected public key.
- **✍️ Cryptographic Message Signing**: Verifiable message signing (`Hello World`) using standard `bs58` encoding.
- **🎨 Modern Aesthetic**: Clean, responsive UI built with Tailwind CSS, supporting automatic dark/light theme switching and crisp visual feedback.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **Blockchain** | `@solana/web3.js` |
| **Wallet Protocol** | `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui` |

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/YOUR_USERNAME/solana-dapp-boilerplate.git
cd solana-dapp-boilerplate
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Architecture

```
├── app/
│   ├── globals.css           # Global Tailwind CSS styles
│   ├── layout.tsx            # Root layout wrapping Solana providers
│   ├── page.tsx              # Interactive dApp dashboard UI
│   └── providers.tsx         # Solana Connection & Wallet Adapter setup
├── components/
│   └── WalletConnectButton.tsx # Custom wallet header, balance listener & status
├── hooks/
│   └── use-mobile.ts         # Responsive viewport utility
├── lib/
│   └── utils.ts              # Classname merging utility
├── metadata.json             # Applet metadata configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript compiler settings
```

---

## 🔒 Security & Best Practices

> [!IMPORTANT]
> - Never hardcode private keys or mnemonic seed phrases into client-side code.
> - Always perform validation and state updates on secure RPC endpoints when deploying to Mainnet-Beta.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
